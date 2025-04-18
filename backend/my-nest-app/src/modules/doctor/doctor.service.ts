import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClinicalDoctor } from 'src/entities/clinical_doctor.entity';
import { Repository } from 'typeorm';
import { ListDoctorGetDto } from '../hospital/dto/ListDotorGet.dto';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { WorkCalender } from 'src/entities/work_calender.entity';
import { Room } from 'src/entities/room.entity';
import { ResponseData } from 'src/global/globalClass';
import { HttpStatusCode, HttpStatusMessage } from 'src/global/globalMessage';

@Injectable()
export class DoctorService {
    constructor(
        @InjectRepository(ClinicalDoctor)
        // private readonly doctorRepository: Repository<Doctor>,
        private readonly staffHospitalRepository: Repository<StaffHospital>,
        @InjectRepository(WorkCalender)
        private readonly workCalenderRepository: Repository<WorkCalender>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
    ) {

    }

    async getMyWork(request: any) {
        const today = new Date(Date.now()).toISOString().split('T')[0];

        const work_calender = await this.workCalenderRepository.findOneBy({
            staff_id: request.user.id,
            work_time: today,
        })

        if (!work_calender) {
            return new ResponseData(
                null,
                HttpStatusCode.SUCCESS,
                "Bạn không có lịch làm việc vào hôm nay",
            )
        } 

        const room = await this.roomRepository.findOneBy({
            id : work_calender.room_id
        })

        return new ResponseData(
            room,
            HttpStatusCode.SUCCESS,
            "Lấy thông tin về lịch làm việc thành công",
        )
    }
}
