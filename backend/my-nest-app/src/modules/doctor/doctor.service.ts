import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { WorkCalender } from 'src/entities/work_calender.entity';
import { Room } from 'src/entities/room.entity';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatusCode } from 'src/global/globalMessage';
import { ESTATUSWORK } from 'src/global/globalEnum';
import { Hospital } from 'src/entities/hospital.entity';
import { Patient } from 'src/entities/patient.entity';
import { Prescriptions } from 'src/entities/prescription.entity';
import { AddPrescriptionDto } from './dto/addPrescription.dto';
import { PrescriptionMedicine } from 'src/entities/prescription_medicine.entity';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(StaffHospital)
        private readonly staffHospitalRepository: Repository<StaffHospital>,
        @InjectRepository(WorkCalender)
        private readonly workCalenderRepository: Repository<WorkCalender>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(Prescriptions)
        private readonly prescriptionsRepository: Repository<Prescriptions>,
        @InjectRepository(PrescriptionMedicine)
        private readonly precriptionMedicineRepository: Repository<PrescriptionMedicine>,
    ) {

    }


    async getMyHospital(doctor_id: number) {
        const staff_hospital = await this.staffHospitalRepository.findOneBy({
            staff_id: doctor_id,
            status: ESTATUSWORK.WORKING,
        })

        if (!staff_hospital) {
            return null;
        }

        return staff_hospital.hospital_id;
    }

    // lấy thông tin phòng khám hôm nay
    async getMyWork(request: any) {
        // lấy ngày hiện tại
        const today = new Date(Date.now()).toISOString().split('T')[0];

        // lấy thông tin về công việc
        const work_calender = await this.workCalenderRepository.findOneBy({
            staff_id: request.user.id,
            work_time: today,
        })

        // nếu ko có trả về mảng rỗng
        if (!work_calender) {
            return new ResponseData(
                null,
                HttpStatusCode.SUCCESS,
                "Bạn không có lịch làm việc vào hôm nay",
            )
        }

        // lấy thông tin phòng làm việc
        const room = await this.roomRepository.findOneBy({
            id: work_calender.room_id
        })

        // trả về thông báo lấy thông tin việc làm thành công
        return new ResponseData(
            room,
            HttpStatusCode.SUCCESS,
            "Lấy thông tin về lịch làm việc thành công",
        )
    }


    // lấy danh sách bệnh nhân cần khám hôm nay
    async getInforPrescription(request: any, patient_id: number) {
        const hospital = await this.hospitalRepository.findOne({
            where: {
                id: request.hospital_id
            },
            select: {
                name: true,
                address: true,
                phone: true,
            }
        });
        const doctor_name = request.user.full_name;

        const patient = await this.patientRepository.findOne({
            where: {
                id: patient_id,
            },
            select: {
                full_name: true,
                birthday: true,
                address: true,
                gender: true,
            }
        })
        let age = 0;
        if (patient && patient.birthday) {
            const birthDate = new Date(patient.birthday);
            const currentDate = new Date();

            age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDifference = currentDate.getMonth() - birthDate.getMonth();

            if (
                monthDifference < 0 ||
                (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
            ) {
                age--;
            }
        }


        const patientData = {
            full_name: patient?.full_name,
            age: age,
            address: patient?.address,
            gender: patient?.gender,
        }

        let prescriptionCode: string = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
        let isDuplicate = true;

        while (isDuplicate) {
            prescriptionCode = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
            const existing = await this.prescriptionsRepository.findOneBy({ id: prescriptionCode });
            isDuplicate = !!existing;
        }

        return new ResponseData(
            {
                patient: patientData,
                doctor_name: doctor_name,
                hospital: hospital,
                prescriptionCode: prescriptionCode,
            },
            HttpStatusCode.SUCCESS,
            "Lấy thông tin đơn thuốc thành công"
        )
    }


    // lấy danh sách bệnh nhân cần khám hôm nay
    async addPrescription(request: any, body: AddPrescriptionDto) {
        const prescription = await this.prescriptionsRepository.save({
            doctor_id: request.user.id,
            hospital_id: request.hospital_id,
            id: body.prescription_id,
            diagnosis: body.diagnosis,
            patient_id: body.patient_id
        })

        for (const item of body.medicine_prescription) {
            // await this.precriptionMedicineRepository.save({
            //     prescription_id: body.prescription_id,
            //     medicine_id: item.medicine_id,
            //     ammount: item.amount,
            //     dosageSchedules: item.timesPerDay,
            //     dose_quantity: item.doseQuantity,
            //     note: item.note,
            //     start_time: '1-2-2025',
            //     end_time: '2-10-2025'
            // })   
        }
    }
}
