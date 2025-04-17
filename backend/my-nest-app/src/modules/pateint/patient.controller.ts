import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { HospitalListDto } from './dto/HospitalList.dto';
import { HospitalDetailDto } from './dto/HospitalDetail.dto';
import { BookingDto } from './dto/Booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { PatientGuard } from 'src/guards/pateint/pateint.guard';

@Controller('patient')
@UseGuards(AuthGuard('jwt'))
export class PatientController {
  constructor(private readonly patientService: PatientService) { }

  @Get('/hospital')
  @HttpCode(HttpStatus.OK)
  async getListHopital(
    @Query() query: HospitalListDto,
  ) {
    return this.patientService.getListHospital(query);
  }

  @Get('/hospital/:id')
  @HttpCode(HttpStatus.OK)
  async getDetailHospital(
    @Param() param : HospitalDetailDto,
  ) {
    return this.patientService.getDetailHospital(param.id);
  }

  @UseGuards(PatientGuard)
  @Post('/hospital/booking')
  @HttpCode(HttpStatus.OK)
  async bookingHospital(
    @Body() body : BookingDto,
    @Request() request: any,
  ) {
    return this.patientService.booking(body, request);
  }
}
