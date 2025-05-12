import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { Hospital } from 'src/entities/hospital.entity';
import { Appointment } from 'src/entities/appointments.entity';
import { User } from 'src/entities/user.entity';
import { Prescriptions } from 'src/entities/prescription.entity';

@Module({
  imports: [
        TypeOrmModule.forFeature([Patient, Hospital, Appointment, User, Prescriptions]),
      ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
