import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointments.entity';
import { ReceptionModule } from '../reception/reception.module';
import { Patient } from 'src/entities/patient.entity';

@Module({
  imports: [
    ReceptionModule,
    TypeOrmModule.forFeature([Appointment, Patient]),

  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule { }
