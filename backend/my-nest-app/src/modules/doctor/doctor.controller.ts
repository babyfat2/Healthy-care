import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ListDoctorGetDto } from '../hospital/dto/ListDotorGet.dto';
import { HospitalAuthGuard } from 'src/guards/hospital-auth/hospital-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ClinicalDoctorAuthGuard } from 'src/guards/clinical-doctor/clinical-doctor.guard';
import { AddPrescriptionDto } from './dto/addPrescription.dto';

@Controller('doctor')
@UseGuards(AuthGuard('jwt'))
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}


  @Get('/work')
  @HttpCode(HttpStatus.OK)
  async getMyWork(
    @Request() request: any
  ) {
    return this.doctorService.getMyWork(request);
  }

  @Get('/patient')
  @HttpCode(HttpStatus.OK)
  async getpatient(
    @Request() request: any
  ) {
    return this.doctorService.getMyWork(request);
  }

  @UseGuards(ClinicalDoctorAuthGuard)
  @Get('/prescription/:id')
  @HttpCode(HttpStatus.OK)
  async getPrescription(
    @Request() request: any,
    @Param("id") patient_id : number,
  ) {
    return this.doctorService.getInforPrescription(request, patient_id);
  }

  @UseGuards(ClinicalDoctorAuthGuard)
  @Post('/prescription')
  @HttpCode(HttpStatus.OK)
  async addPrescription(
    @Request() request: any,
    @Body() body: AddPrescriptionDto,
  ) {
    return this.doctorService.addPrescription(request, body);
  }
}
