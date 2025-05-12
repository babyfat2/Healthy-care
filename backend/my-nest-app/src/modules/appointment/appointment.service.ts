import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { Appointment } from 'src/entities/appointments.entity';
import { PaginationResponse, ResponseData } from 'src/global/globalClass';
import { ESTATUSAPOINTMENT } from 'src/global/globalEnum';
import { HttpStatusCode } from 'src/global/globalMessage';
import { DataSource, Repository } from 'typeorm';
import { AppointmentChangeDto } from './dto/AppointmentChange.dto';
import { Patient } from 'src/entities/patient.entity';
import { PatientGateway } from 'src/socket/patient/patient.gateway';
import { AppointmentListDto } from './dto/AppointmentList.dto';

@Injectable()
export class AppointmentService {

    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        private readonly pateintGateway: PatientGateway,
    ) { }

    // lấy danh sách cuộc hen
    async getListAppointment(query: AppointmentListDto, request: any) {
        let hospital_id = request.hospital_id;


        const where: any = {
            hospital_id: hospital_id,
          };
          
        if (query.status !== undefined) {
            where.status = query.status;
          }

        if (query.time !== undefined) {
            where.appointment_time = query.time;
        }
        const [appointments, total] = await this.appointmentRepository.findAndCount({
            where,
            select: {
                id: true,
                stt: true,
                description: true,
                name: true,
                appointment_time: true,
                phone: true,
            },
            take: query.row,
            skip: (query.page - 1) * query.row,
            order: {
                appointment_time: 'ASC', // sắp xếp theo ngày (nếu cần)
            }
        })

        return new PaginationResponse(
            appointments, {
            total: total,
            page: query.page,
            row: query.row,
        }
        )
    }

    // thay đổi trạng thái cuộc hẹn
    async changeAppointment(body: AppointmentChangeDto, request: any) {
        // lấy id bệnh viện
        let hospital_id = request.hospital_id;
        // xác định xem cuộc hẹn có phải của bệnh viện không
        const appointment = await this.appointmentRepository.findOneBy({
            hospital_id: hospital_id,
            id: body.appointment_id,
        })

        // báo lỗi nếu cuộc hẹn ko thuộc bệnh viện của bạn
        if (!appointment) {
            return new ResponseData(
                null,
                HttpStatusCode.BAD_REQUEST,
                "Lịch hẹn này không thuộc bệnh viện bạn"
            )
        }

        // thay đổi trạng thái cuộc hẹn
        await this.appointmentRepository.update({
            id: body.appointment_id,
        }, {
            status: body.status,
        })

        // trả về kết quả thành công
        return new ResponseData(
            null,
            HttpStatusCode.SUCCESS,
            "Thay đổi trạng thái cuộc hẹn thành công",
        )
    }


    // lấy chi tiết cuộc hẹn để xử lý
    async progressAppointment(request: any, appointment_id: number) {
        // lấy id bệnh viện
        let hospital_id = request.hospital_id;

        const appointment = await this.appointmentRepository.findOneBy({
            id: appointment_id,
            hospital_id: hospital_id,
        })

        if (!appointment) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy cuộc hẹn"
            )
        }

        // GỌI SOCKET ở đây 👇
        await this.pateintGateway.inProgressAppointment();

        // cập nhật trang thái cuộc hẹn
        await this.appointmentRepository.update({id: appointment_id}, {status: ESTATUSAPOINTMENT.IN_PROGRESS});

        const patient = await this.patientRepository.findOne({
            where: {
                id: appointment.patient_id,
            },
            select: {
                id: true,
                citizen_identification_id: true,
                full_name: true,
                address: true,
                hometown: true,
                birthday: true,
                ethnicity: true,
                issued_date: true,
                issued_place: true,
                phone: true,
            }
        })


        return new ResponseData(
            {appointment: appointment, patient: patient },
            HttpStatusCode.SUCCESS,
            "Lấy thông tin người bệnh thành công"
        )
    }
}
