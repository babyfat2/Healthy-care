import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ClinicalDoctor } from 'src/entities/clinical_doctor.entity';
import { StaffHospital } from 'src/entities/staff_hospital.entity';
import { WorkCalender } from 'src/entities/work_calender.entity';
import { Room } from 'src/entities/room.entity';
import { Hospital } from 'src/entities/hospital.entity';
import { Patient } from 'src/entities/patient.entity';
import { Prescriptions } from 'src/entities/prescription.entity';
import { PrescriptionMedicine } from 'src/entities/prescription_medicine.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([User, ClinicalDoctor, StaffHospital, WorkCalender, Room, Hospital, Patient, Prescriptions, PrescriptionMedicine]),

    ],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
