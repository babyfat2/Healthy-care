import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from 'src/entities/hospital.entity';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { Room } from 'src/entities/room.entity';
import { User } from 'src/entities/user.entity';
import { WorkCalender } from 'src/entities/work_calender.entity';
import { ReceptionModule } from '../reception/reception.module';

@Module({
  imports: [
    ReceptionModule,
    TypeOrmModule.forFeature([Hospital, StaffHospital, Room, User, WorkCalender ]),

  ],
  controllers: [HospitalController],
  providers: [HospitalService],
  exports: [HospitalService],
})
export class HospitalModule { }
