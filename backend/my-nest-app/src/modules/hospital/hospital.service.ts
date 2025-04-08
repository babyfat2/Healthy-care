import { Injectable, Res, Search } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { Between, ILike, In, MoreThan, Repository } from 'typeorm';
import { ListDoctorGetDto } from './dto/ListDotorGet.dto';
import { Hospital } from 'src/entities/hospital.entity';
import { PaginationResponse, ResponseData } from 'src/global/globalClass';
import { HttpStatusCode, HttpStatusMessage } from 'src/global/globalMessage';
import { Room } from 'src/entities/room.entity';
import { ListRoomGetDto } from './dto/ListRoomGet.dto';
import { DoctorInviteDto } from './dto/DoctorInvite.dto';
import { User } from 'src/entities/user.entity';
import { EROLE, ESTATUSWORK } from 'src/global/globalEnum';
import { MailerService } from '@nestjs-modules/mailer';
import { RoomCreateDto } from './dto/RoomCreate.dto';
import { WorkCalender } from 'src/entities/work_calender.entity';
import { WorkDoctorGetDto } from './dto/WorkDoctorGet.dto';
import { WorkAddDto } from './dto/WorkAdd.dto';

@Injectable()
export class HospitalService {
    constructor(
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
        @InjectRepository(StaffHospital)
        private readonly staffHospitalRepository: Repository<StaffHospital>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(WorkCalender)
        private readonly workCalenderRepository: Repository<WorkCalender>,
        private readonly mailerService: MailerService,
    ) { }


    // lấy thông tin tài khoản đăng nhập
    async getHositalById(id: number) {
        return await this.hospitalRepository.findOne({
            where: {
                user_id: id,
            },
            select: {
                id: true,
            }
        })
    }


    async getListDoctor(query: ListDoctorGetDto, request: any) {
        let staff_hospital = this.staffHospitalRepository
            .createQueryBuilder("staff_hospital")
            .leftJoinAndSelect("staff_hospital.staff", "user")
            .leftJoinAndSelect("user.clinical_doctor", "clinical_doctor")
            .leftJoinAndSelect("user.paraclinical_doctor", "paraclinical_doctor")
            .leftJoinAndSelect("user.receptionist", "receptionist")
            .select([
                "user.id as id",
                "user.email as email",
                "user.full_name as full_name",
                "user.role as role",
                "clinical_doctor.clinical_specialties as clinical_specialties ",
                "paraclinical_doctor.paraclinical_specialties as paraclinical_specialties",
                "staff_hospital.status as status",
                "staff_hospital.start_at as start_at",
            ])
            .where("staff_hospital.hospital_id = :id", { id: request.hospital_id })
            .andWhere("staff_hospital.status = :status", {status: ESTATUSWORK.WORKING})


        // tìm kiếm theo tên bác sĩ
        if (query.search) {
            staff_hospital = staff_hospital.andWhere("user.full_name LIKE :name", { name: `%${query.search}%` })
        }

        //chọn vai trò
        if (query.role) {
            staff_hospital = staff_hospital.andWhere("user.role = :role", { role: query.role });
        }

        // chọn theo chuyên môn
        if (query.specialties) {
            staff_hospital = staff_hospital.andWhere(
                "(clinical_doctor.clinical_specialties = :specialty OR paraclinical_doctor.paraclinical_specialties = :para_specialty)",
                { specialty: `${query.specialties}`, para_specialty: `${query.specialties}` }
            );
        }


        // chọn theo trạng thái
        if (query.status) {
            staff_hospital = staff_hospital.andWhere("staff_hospital.status = :status", { status: query.status })
        }


        if (query.page) {

            const row = query.row ? query.row : 5;
            const total = await staff_hospital.getCount();
            const data = await staff_hospital.limit(row).offset((query.page - 1) * row).getRawMany();

            return new PaginationResponse(data, {
                total: total,
                page: query.page,
                row: row,
            })
        }

        const data = await staff_hospital.getRawMany();

        return new ResponseData(
            data,
            HttpStatusCode.SUCCESS,
            "Lấy danh sách nhân viên bệnh viện thành công",
        )
    }

    async getDetailDoctor(id: number, request: any) {
        // kiểm tra xem bác sĩ đã hoặc đang làm việc tại bệnh viện này không
        const staff_hospital = await this.staffHospitalRepository.findBy({
            staff_id: id,
            hospital_id: request.hospital_id,
            status: In([ESTATUSWORK.WORKING, ESTATUSWORK.RESIGNED])
        })

        // nếu ko tìm thấy thông tin báo lỗi
        if (staff_hospital.length === 0) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy thông tin nhân viên này của bệnh viện",
            )
        }

        const inforDoctor = await this.userRepository.findOne({
            where: {
                id: id,
            },
            relations: ["clinical_doctor", "paraclinical_doctor", "receptionist"]
        })

        if (!inforDoctor) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy thông tin nhân viên này",
            )
        }


        let result = new Object();
        result = {
            id: inforDoctor.id,
            email: inforDoctor.email,
            full_name: inforDoctor.full_name,
            avatar: inforDoctor.avatar,
            role: inforDoctor.role,
        }

        if (inforDoctor.role === EROLE.CLINICAL_DOCTOR) {
            Object.assign(result, {
                specialty: inforDoctor.clinical_doctor?.clinical_specialties,
                experience_year: inforDoctor.clinical_doctor?.experience_year,
                license_number: inforDoctor.clinical_doctor?.license_number,
            });
        }

        if (inforDoctor.role === EROLE.PARACLINICAL_DOCTOR) {
            Object.assign(result, {
                specialty: inforDoctor.paraclinical_doctor?.paraclinical_specialties,
                experience_year: inforDoctor.paraclinical_doctor?.experience_year,
                license_number: inforDoctor.paraclinical_doctor?.license_number,
            });
        }

        if (inforDoctor.role === EROLE.RECEPTION) {
            Object.assign(result, {
                phone: inforDoctor.receptionist?.phone,
            });
        }



        return new ResponseData(
            result,
            HttpStatusCode.SUCCESS,
            "Lấy thông tin nhân viên thành công",
        )

    }

    // lấy lịch trực của bác sĩ
    async getWorkDoctor(id: number, time: WorkDoctorGetDto, request: any) {
        // kiểm tra xem bác sĩ đã hoặc đang làm việc tại bệnh viện này không
        const staff_hospital = await this.staffHospitalRepository.findBy({
            staff_id: id,
            hospital_id: request.hospital_id,
            status: In([ESTATUSWORK.WORKING, ESTATUSWORK.RESIGNED])
        })


        // nếu ko tìm thấy thông tin báo lỗi
        if (staff_hospital.length == 0) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy thông tin nhân viên này của bệnh viện",
            )
        }

        // mặc định thời gian tìm kiếm theo thời gian hiện tại
        const now = new Date();
        let month = now.getMonth() + 1; // getMonth() trả về 0-11, nên cộng thêm 1
        let year = now.getFullYear();
        // nếu biến time được truyền vào thay đổi giá trị của tháng và năm theo biến time
        if (time.time) {

            const [monthStr, yearStr] = time.time.split("-");
            month = parseInt(monthStr);
            year = parseInt(yearStr);
        }

        // tìm kiếm lịch trực
        const work_calender = await this.workCalenderRepository
            .createQueryBuilder("work_calender")
            .leftJoinAndSelect("work_calender.room", "room")
            .select([
                "work_calender.id as id",
                "DATE_FORMAT(work_calender.work_time, '%Y-%m-%d') as work_time",
                "room.room_number as room_number",
                "room.name_building as name_building"
            ])
            .where("room.hospital_id = :hospital AND work_calender.staff_id = :staff", { hospital: request.hospital_id, staff: id })
            .andWhere("MONTH(work_calender.work_time) = :month", { month })
            .andWhere("YEAR(work_calender.work_time) = :year", { year })
            .orderBy("work_calender.work_time")
            .getRawMany();

        return new ResponseData(
            work_calender,
            HttpStatusCode.SUCCESS,
            "Lấy lịch trực của nhân viên thành công",
        )

    }


    // Thêm lịch trực
    async addWork(doctor_id: number, room_id: number, data: WorkAddDto, request: any) {


        if (!data.is_range) {
            // kiểm tra xem bác sĩ có lịch làm việc trùng không
            const work_calender = await this.workCalenderRepository.findBy({
                staff_id: doctor_id,
                work_time: data.time,
            })
            if (work_calender.length > 0) {
                return new ResponseData(
                    null,
                    HttpStatusCode.BAD_REQUEST,
                    "Bác sĩ đã được phân công công việc trong thời gian này!"
                )
            }

            const room_calender = await this.workCalenderRepository.findBy({
                room_id: room_id,
                work_time: data.time,
            })

            if (room_calender.length > 0) {
                return new ResponseData(
                    null,
                    HttpStatusCode.BAD_REQUEST,
                    "Phòng làm việc đã có bác sĩ trong thời gian làm việc này!"
                )
            }

            // Thêm bác sĩ nếu không trùng lịch
            await this.workCalenderRepository.save({
                staff_id: doctor_id,
                room_id: room_id,
                work_time: data.time,
            });

            return new ResponseData(
                work_calender,
                HttpStatusCode.SUCCESS,
                "Thêm lịch trực thành công!",
            )
        } else {
            const work_calender = await this.workCalenderRepository.findBy({
                staff_id: doctor_id,
                work_time: Between(data.start_at, data.end_at),
            })

            if (work_calender.length > 0) {
                return new ResponseData(
                    null,
                    HttpStatusCode.BAD_REQUEST,
                    "Bác sĩ đã được phân công công việc trong khoảng thời gian này!"
                )
            }

            const room_calender = await this.workCalenderRepository.findBy({
                room_id: room_id,
                work_time: Between(data.start_at, data.end_at),
            })

            if (room_calender.length > 0) {
                return new ResponseData(
                    null,
                    HttpStatusCode.BAD_REQUEST,
                    "Phòng làm việc đã có bác sĩ trong thời gian làm việc này!"
                )
            }

            const start = new Date(data.start_at!);
            const end = new Date(data.end_at!);

            const workDays: Object[] = [];

            // Sửa vòng lặp để tránh thay đổi đối tượng `d` trực tiếp
            for (let d = new Date(start); d <= end; d = new Date(d.setDate(d.getDate() + 1))) {
                const isoDate = d.toISOString().split('T')[0]; // format YYYY-MM-DD
                workDays.push({
                    staff_id: doctor_id,
                    room_id: room_id,
                    work_time: isoDate,
                });
            }

            await this.workCalenderRepository.save(workDays);

            return new ResponseData(
                work_calender,
                HttpStatusCode.SUCCESS,
                "Thêm lịch trực thành công!",
            )
        }
    }

    // Xóa lịch trực
    async deleteWork (work_calender_id: number) {
        const work_calender = await this.workCalenderRepository.delete({
            id: work_calender_id,
        })

        if (work_calender.affected && work_calender.affected > 0) {
            // Xóa thành công
            return new ResponseData(
                null,
                HttpStatusCode.SUCCESS,
                "Xóa lịch trực thành công!"
            );
        } else {
            // Không tìm thấy hoặc không xóa được
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy lịch trực này"
            );
        }
    }

    // mời bác sĩ làm việc tại bệnh viện
    async inviteDoctor(data: DoctorInviteDto, request) {
        // tìm kiếm bác sĩ theo gmail
        const doctor = await this.userRepository.findOne({
            where: {
                email: data.email,
                role: In([EROLE.PARACLINICAL_DOCTOR, EROLE.CLINICAL_DOCTOR, EROLE.RECEPTION])
            }
        });

        // trả về lỗi nếu ko tìm thấy bác sĩ
        if (!doctor) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy bác sĩ",
            )
        }

        // kiểm tra xem bác sĩ đã làm việc tại bệnh viện nào chưa
        const staff_hospital = await this.staffHospitalRepository.findBy({
            staff_id: doctor.id,
            status: ESTATUSWORK.WORKING,
        });

        staff_hospital.map(e => {
            if (e.end_at > data.start_at || e.end_at === null) {
                return new ResponseData(
                    null,
                    HttpStatusCode.BAD_REQUEST,
                    "Bác sĩ đã làm việc tại bệnh viện khác",
                )
            }
        })


        const createStaff = await this.staffHospitalRepository.create({
            staff_id: doctor.id,
            hospital_id: request.hospital_id,
            start_at: new Date(),
            status: ESTATUSWORK.INVITED,
        })

        try {
            // Send email to user
            await this.mailerService.sendMail({
                to: data.email,
                subject: '(Healthy-care) Xác nhận thay đổi mật khẩu',
                template: './forgot-password',
                context: {
                    email: data.email,
                    url: process.env.FRONTEND_WEB_SITE + "change-password/",
                },

            });

            await this.staffHospitalRepository.save(createStaff);
            return new ResponseData(
                null,
                HttpStatusCode.SUCCESS,
                "Mời bác sĩ làm việc tại bệnh viện thành công",
            )
        } catch (e) {
            return new ResponseData(
                null,
                HttpStatusCode.BAD_REQUEST,
                HttpStatusMessage.ERROR_SEND_EMAIL,
            );
        }

    }

    async getListRoom(query: ListRoomGetDto, request: any) {

        const whereCondition: any = {}; // Khởi tạo object điều kiện

        if (query.search) {
            whereCondition.room_number = ILike(`%${query.search}%`); // Tìm kiếm theo tên phòng
        }

        if (query.type) {
            whereCondition.room_type = query.type; // Lọc theo loại phòng nếu có
        }

        if (query.specialties) {
            whereCondition.specialties = query.specialties; // Lọc theo loại phòng nếu có
        }

        const [rooms, total] = await this.roomRepository.findAndCount({
            where: whereCondition, // Tìm kiếm theo tên phòng
            skip: (query.page - 1) * query.row, // Bỏ qua số lượng trước đó
            take: query.row, // Lấy số lượng theo limit
        });

        return new PaginationResponse(rooms, {
            total: total,
            page: query.page,
            row: query.row,
        })
    }

    async createRoom(body: RoomCreateDto, request: any) {
        // tìm xem phòng đã tồn tại chưa
        const findRoom = await this.roomRepository.findOneBy({
            hospital_id: request.hospital_id,
            room_number: body.room_number,
            name_building: body.name_building,
        })

        // thông báo nếu phòng đã tồn tại
        if (findRoom) {
            return new ResponseData(
                null,
                HttpStatusCode.BAD_REQUEST,
                "Phòng đã tồn tại",
            )
        }

        // tạo phòng
        const createRoom = await this.roomRepository.create({
            hospital_id: request.hospital_id,
            name_building: body.name_building,
            room_number: body.room_number,
            room_type: body.room_type,
            specialties: body.specialties
        })

        this.roomRepository.save(createRoom);

        // thông báo tạo phòng thành công
        return new ResponseData(
            null,
            HttpStatusCode.SUCCESS,
            "Tạo phòng thành công",
        )

    }

    async getDetailRoom(id: number, request: any) {
        const roomDetail = await this.roomRepository.findOneBy({
            hospital_id: request.hospital_id,
            id: id,
        })

        if (!roomDetail) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy phòng khám",
            )
        }

        return new ResponseData(
            roomDetail,
            HttpStatusCode.SUCCESS,
            "Lấy thông tin phòng khám thành công",
        )
    }

    // lấy lịch trực của Room
    async getWorkRoom(id: number, time: WorkDoctorGetDto, request: any) {
        // kiểm tra xem phòng khám có thuộc bệnh viện này không
        const room_hospital = await this.roomRepository.findBy({
            id: id,
            hospital_id: request.hospital_id,
        })


        // nếu ko tìm thấy phòng khám báo lỗi
        if (room_hospital.length == 0) {
            return new ResponseData(
                null,
                HttpStatusCode.NOT_FOUND,
                "Không tìm thấy thông tin nhân viên này của bệnh viện",
            )
        }

        // mặc định thời gian tìm kiếm theo thời gian hiện tại
        const now = new Date();
        let month = now.getMonth() + 1; // getMonth() trả về 0-11, nên cộng thêm 1
        let year = now.getFullYear();
        // nếu biến time được truyền vào thay đổi giá trị của tháng và năm theo biến time
        if (time.time) {

            const [monthStr, yearStr] = time.time.split("-");
            month = parseInt(monthStr);
            year = parseInt(yearStr);
        }

        // tìm kiếm lịch trực
        const work_calender = await this.workCalenderRepository
            .createQueryBuilder("work_calender")
            .leftJoinAndSelect("work_calender.staff", "user")
            .select([
                "work_calender.id as id",
                "DATE_FORMAT(work_calender.work_time, '%Y-%m-%d') as work_time",
                "user.email as email",
                "user.full_name as full_name"
            ])
            .where("work_calender.room_id = :id", {id})
            .andWhere("MONTH(work_calender.work_time) = :month", { month })
            .andWhere("YEAR(work_calender.work_time) = :year", { year })
            .orderBy("work_calender.work_time")
            .getRawMany();

        return new ResponseData(
            work_calender,
            HttpStatusCode.SUCCESS,
            "Lấy lịch trực của nhân viên thành công",
        )

    }
}
