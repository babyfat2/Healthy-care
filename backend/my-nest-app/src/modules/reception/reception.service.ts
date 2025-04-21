import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { Appointment } from 'src/entities/appointments.entity';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { ESTATUSWORK } from 'src/global/globalEnum';
import { Repository } from 'typeorm';

@Injectable()
export class ReceptionService {
    constructor(
            @InjectRepository(StaffHospital)
            private readonly staffHospitalRepository: Repository<StaffHospital>,
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

}
