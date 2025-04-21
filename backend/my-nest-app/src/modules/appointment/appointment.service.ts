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

@Injectable()
export class AppointmentService {

    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Patient)
        private readonly patientRepository: Repository<Patient>,
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) { }

    // lấy danh sách cuộc hen
    async getListAppointment(query: PaginationDto, request: any) {
        let hospital_id = request.hospital_id;
        const [appointments, total] = await this.appointmentRepository.findAndCount({
            where: {
                hospital_id: hospital_id,
                status: ESTATUSAPOINTMENT.PENDING,
            },
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

    // lấy danh sách người bệnh
    async getDetailAppointment(request: any) {
        // lấy id bệnh viện
        let hospital_id = request.hospital_id;
        // lấy ngày hiện tại
        const today = new Date();
        const dateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        // bắt đầu transaction
        await queryRunner.startTransaction();

        try {
            // lấy cuộc hẹn có thứ tự gần nhất
            const appointment = await queryRunner.manager.findOne(Appointment, {
                where: {
                    hospital_id,
                    appointment_time: dateOnly,
                    status: ESTATUSAPOINTMENT.CONFIRMED,
                },
                order: {
                    stt: 'ASC',
                },
                lock: { mode: 'pessimistic_write' }, // 👈 KHÓA BẢN GHI
            });


            // trả về 400 nếu ko thấy còn bản ghi nào
            if (!appointment) {
                await queryRunner.rollbackTransaction();
                return new ResponseData(null, HttpStatusCode.NOT_FOUND, "Đã hết người đặt khám trước hôm nay");
            }

            const pateint = await this.patientRepository.findOne({
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

            await queryRunner.manager.update(Appointment, { id: appointment.id }, {
                status: ESTATUSAPOINTMENT.IN_PROGRESS,
            });

            await queryRunner.commitTransaction();

            return new ResponseData({appointment: appointment, pateint: pateint}, HttpStatusCode.SUCCESS, "Lấy thông tin người bệnh thành công");

        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
