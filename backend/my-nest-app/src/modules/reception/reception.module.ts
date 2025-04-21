import { Module } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { ReceptionController } from './reception.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointments.entity';
import { StaffHospital } from 'src/entities/staff_hospital.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Appointment, StaffHospital]),
  
    ],
  controllers: [ReceptionController],
  providers: [ReceptionService],
  exports: [ReceptionService],
})
export class ReceptionModule {}
