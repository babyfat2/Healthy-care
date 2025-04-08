import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ClinicalDoctor } from 'src/entities/clinical_doctor.entity';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { WorkCalender } from 'src/entities/work_calender.entity';
import { Room } from 'src/entities/room.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([User, ClinicalDoctor, StaffHospital, WorkCalender, Room]),

    ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
