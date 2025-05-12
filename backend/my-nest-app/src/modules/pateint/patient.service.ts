import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hospital } from 'src/entities/hospital.entity';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';
import { HospitalListDto } from './dto/HospitalList.dto';
import { PaginationResponse, ResponseData } from 'src/global/globalClass';
import { HttpStatusCode, HttpStatusMessage } from 'src/global/globalMessage';
import { BookingDto } from './dto/Booking.dto';
import { Appointment } from 'src/entities/appointments.entity';
import { User } from 'src/entities/user.entity';
import { Prescriptions } from 'src/entities/prescription.entity';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Prescriptions)
        private readonly prescriptionRepository: Repository<Prescriptions>,
    ) { }

    async getpatientById(id: number) {
        return await this.patientRepository.findOne({
            where: {
                id: id,
            },
            select: {
                id: true,
            }
        })
    }


    async getListHospital(query: HospitalListDto) {
        const hospital_list = this.hospitalRepository
            .createQueryBuilder("hopsital")
            .select([
                "id",
                "name",
                "address",
                "avatar"
            ]);

        // Tìm kiếm theo tên hoặc địa chỉ
        if (query.search) {
            hospital_list.andWhere(
                `(hopsital.name LIKE :search OR hopsital.address LIKE :search)`,
                { search: `%${query.search}%` }
            );
        }

        // Tính khoảng cách nếu có lat/lng
        if (query.latitude && query.longitude) {
            hospital_list.addSelect(`
                (6371 * acos(
                    cos(radians(:lat)) * cos(radians(hopsital.latitude)) *
                    cos(radians(hopsital.longitude) - radians(:lng)) +
                    sin(radians(:lat)) * sin(radians(hopsital.latitude))
                ))`, 'distance'
            ).setParameters({
                lat: query.latitude,
                lng: query.longitude
            });

            // Có thể filter theo khoảng cách nếu bạn muốn
            // hospital_list.andHaving('distance < :maxDistance', { maxDistance: 10 });

            // Sắp xếp theo khoảng cách
            hospital_list.orderBy('distance', 'ASC');
        }


        if (query.page) {

            const row = query.row ? query.row : 5;
            const total = await hospital_list.getCount();
            const data = await hospital_list.limit(row).offset((query.page - 1) * row).getRawMany();

            return new PaginationResponse(data, {
                total: total,
                page: query.page,
                row: row,
            })
        }

        const data = await hospital_list.getRawMany();

        return new ResponseData(
            data,
            HttpStatusCode.SUCCESS,
            HttpStatusMessage.LOGIN_SUCCESS
        );
    }

    async getDetailHospital(hospital_id: number) {
        const hospital_detail = await this.hospitalRepository.findOne({
            where: {
                id: hospital_id
            },
            relations: {
                hospitalImage: true, // 👈 THÊM dòng này để load quan hệ
              },
            select: {
                id: true,
                name: true,
                address: true,
                phone: true,
                email: true,
                description: true,
            }
        })

        return new ResponseData(
            hospital_detail,
            HttpStatusCode.SUCCESS,
            HttpStatusMessage.LOGIN_SUCCESS
        );
    }

    async booking(body: BookingDto, request: any) {
        const hospital  = await this.hospitalRepository.findOneBy({id: body.hospital_id});
        if (!hospital) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Bệnh viện bạn đặt lịch không tồn tại",
            )
        }

        let patient_id : number = -1;
        if (request.user.patient_id) {
            patient_id = request.user.pateint_id
        } else {
            const patient = await this.patientRepository.save({
            })
            await this.userRepository.update({
                    id: request.user.id
                }, 
                {
                patient_id: patient.id
                })
            patient_id = patient.id;
        }
        const appointmment = await this.appointmentRepository.findBy({
            patient_id: request.user.patient_id,
            appointment_time: body.appointment_time,
        })

        if (appointmment.length > 1) {
            return new ResponseData(
                null,
                HttpStatusCode.CONFLICT,
                "Bạn đã có lịch khám vào hôm nay",
            )
        }

        const stt = await this.appointmentRepository.count({
            where: {
                appointment_time: body.appointment_time,
                hospital_id: body.hospital_id,
            }
        })

        const save_appointment = await this.appointmentRepository.save({
            patient_id: patient_id,
            hospital_id: body.hospital_id,
            phone: body.phone,
            appointment_time: body.appointment_time,
            description: body.description,
            stt: stt + 1,
            user_id: request.user.id
        })

        return new ResponseData(
            save_appointment,
            HttpStatusCode.SUCCESS,
            "Bạn đã đặt lịch khám thành công",
        )
    }

    async getPrescription(id: string) {
        const prescription = await this.prescriptionRepository
            .createQueryBuilder("prescription")
            .leftJoinAndSelect("prescription.prescriptionMedicine", "prescriptionMedicine")
            .leftJoinAndSelect("prescriptionMedicine.dosageSchedules", "dosageSchedules")
            .leftJoinAndSelect("prescriptionMedicine.medicine", "medicine")
            .where("prescription.id = :id", { id })
            .getOne();

        if (!prescription) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Đơn thuốc không tồn tại",
            )
        }

        return new ResponseData(
            prescription,
            HttpStatusCode.SUCCESS,
            "Lấy đơn thuốc thành công",
        )
    }

    async getMedical(request: any) {
        const appointmments = await this.appointmentRepository
        .createQueryBuilder("appointments")
        .leftJoinAndSelect("appointments.hospital", "hospital")
        .where("appointments.user_id = :id", { id: request.user.id })
        .getMany();

        return new ResponseData(
            appointmments,
            HttpStatusCode.SUCCESS,
            "Lấy danh sách cuộc hẹn thành công"
        )
    }

    async getMedicalDetail(appointment_id: number) {
        const appointment = await this.appointmentRepository.findOneBy({
            id: appointment_id,
        })

        if (!appointment) {
            return new ResponseData(
                appointment,
                HttpStatusCode.SUCCESS,
                "Lấy danh sách cuộc hẹn thành công"
            )
        }
        const hospital = await this.hospitalRepository.findOneBy({
            id: appointment.hospital_id,
        })

        const prescription = await this.prescriptionRepository
        .createQueryBuilder("prescription")
        .leftJoinAndSelect("prescription.prescriptionMedicine", "prescriptionMedicine")
        .leftJoinAndSelect("prescriptionMedicine.medicine", "medicine")
        .where("prescription.appointment_id = :id", { id: appointment_id })
        .getOne();


        return new ResponseData(
            {
                hospital: hospital,
                prescription: prescription,
            },
            HttpStatusCode.SUCCESS,
            "Lấy danh sách cuộc hẹn thành công"
        )
    }
}
