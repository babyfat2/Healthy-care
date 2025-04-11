import { Controller, Get, HttpCode, HttpStatus, Param, Query, Request, UseGuards } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { ListDoctorGetDto } from '../hospital/dto/ListDotorGet.dto';
import { HospitalAuthGuard } from 'src/guards/hospital-auth/hospital-auth.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @Get('/pateint')
  @HttpCode(HttpStatus.OK)
  async getPateint(
    @Request() request: any
  ) {
    return this.doctorService.getMyWork(request);
  }


}
