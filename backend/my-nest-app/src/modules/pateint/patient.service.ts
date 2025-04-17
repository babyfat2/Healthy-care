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

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
    ) { }

    async getpatientById(id: number) {
        return await this.patientRepository.findOne({
            where: {
                user_id: id,
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

        const appointmment = await this.appointmentRepository.findBy({
            patient_id: request.patient_id,
            appointment_time: body.appointment_time, 
        })

        if (appointmment.length > 1) {
            return new ResponseData(
                null,
                HttpStatusCode.CONFLICT,
                "Bạn đã có lịch khám vào hôm nay",
            )
        }

        const save_appointment = await this.appointmentRepository.save({
            patient_id: request.patient_id,
            hospital_id: body.hospital_id,
            appointment_time: body.appointment_time,
            description: body.description,
        })

        return new ResponseData(
            save_appointment,
            HttpStatusCode.SUCCESS,
            "Bạn đã đặt lịch khám thành công",
        )
    }
}
