import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { ESTATUSAPOINTMENT, ESTATUSWORK } from 'src/global/globalEnum';
import { Not, Repository } from 'typeorm';
import { ConfirmProfileDto } from './dto/confirmProfile.dto';
import { Patient } from 'src/entities/patient.entity';
import { User } from 'src/entities/user.entity';
import { Appointment } from 'src/entities/appointments.entity';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatusCode } from 'src/global/globalMessage';

@Injectable()
export class ReceptionService {
    constructor(
        @InjectRepository(StaffHospital)
        private readonly staffHospitalRepository: Repository<StaffHospital>,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
    ) { }


    async getHospitalWork(id: number) {
        const staff_hospital = await this.staffHospitalRepository.findOneBy({
            staff_id: id,
            status: ESTATUSWORK.WORKING,
        })

        if (!staff_hospital) {
            return null;
        }

        return staff_hospital.hospital_id;
    }

    async confirmProfile(body: ConfirmProfileDto, request: any) {
        // lấy thông tin người dùng
        const patient = body.patient;
        const today = new Date();
        const appointmentDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        // nếu có patient_id
        if (patient.id && body.appointment_id) {
            // kiểm tra xem có patient nào có mã căn cước công dân tương tự không
            const patientData = await this.patientRepository.findOneBy({
                citizen_identification_id: patient.citizen_identification_id,
                id: Not(patient.id),
            });

            // cập nhật lại thông tin bệnh nhân đó
            await this.patientRepository.update({
                citizen_identification_id: patient.citizen_identification_id
            }, {
                full_name: patient.full_name,
                address: patient.address,
                hometown: patient.hometown,
                birthday: patient.birthday,
                ethnicity: patient.ethnicity,
                issued_date: patient.issued_date,
                issued_place: patient.issued_place,
                phone: patient.phone,
            });


            // nếu tồn tại bệnh nhân có mã căn cước tương tự và id không trùng
            if (patientData) {
                if (body.user_id) {
                    // cập nhật patient_id cho tài khoản
                    await this.userRepository.update({
                        patient_id: body.user_id
                    }, {
                        patient_id: patientData.id
                    })
                    // xóa bản ghi chứa thông tin patient cũ đi
                    await this.patientRepository.delete({ id: patient.id })
                }
            }
        } else {
            // kiểm tra xem có patient nào có mã căn cước công dân tương tự không
            const patientData = await this.patientRepository.findOneBy({
                citizen_identification_id: patient.citizen_identification_id,
            });


            // nếu tồn tại bệnh nhân có mã căn cước tương tự
            if (patientData) {
                // cập nhật thông tin bệnh nhân
                await this.patientRepository.update({
                    citizen_identification_id: patient.citizen_identification_id
                }, {
                    full_name: patient.full_name,
                    address: patient.address,
                    hometown: patient.hometown,
                    birthday: patient.birthday,
                    ethnicity: patient.ethnicity,
                    issued_date: patient.issued_date,
                    issued_place: patient.issued_place,
                    phone: patient.phone,
                }),

                    // cập nhật thông tin bệnh nhân
                    await this.appointmentRepository.save({
                        patient_id: patientData.id,
                        hospital_id: request.hospital_id,
                        appointment_time: appointmentDateOnly,
                        description: body.appointment_description,
                        status: ESTATUSAPOINTMENT.IN_PROGRESS,
                    })

            } else {
                // tạo mới thông tin bệnh nhân
                const newPatient = await this.patientRepository.save({
                    citizen_identification_id: patient.citizen_identification_id,
                    full_name: patient.full_name,
                    address: patient.address,
                    hometown: patient.hometown,
                    birthday: patient.birthday,
                    ethnicity: patient.ethnicity,
                    issued_date: patient.issued_date,
                    issued_place: patient.issued_place,
                    phone: patient.phone,
                })

                // cập nhật thông tin bệnh nhân
                await this.appointmentRepository.save({
                    patient_id: newPatient.id,
                    hospital_id: request.hospital_id,
                    appointment_time: appointmentDateOnly,
                    description: body.appointment_description,
                    status: ESTATUSAPOINTMENT.IN_PROGRESS,
                })
            }
        }

        return new ResponseData(
            null,
            HttpStatusCode.SUCCESS,
            "Nhập thông tin bệnh nhân thành công"
        )

    }

}
