import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { HospitalListDto } from './dto/HospitalList.dto';
import { HospitalDetailDto } from './dto/HospitalDetail.dto';
import { BookingDto } from './dto/Booking.dto';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('/hospital/booking')
  @HttpCode(HttpStatus.OK)
  async bookingHospital(
    @Body() body : BookingDto,
    @Request() request: any,
  ) {
    return this.patientService.booking(body, request);
  }

  @Get('/prescription/:id')
  @HttpCode(HttpStatus.OK)
  async getPresciption(
    @Param('id') id : string,
  ) {
    return this.patientService.getPrescription(id);
  }

  @Get('/medical')
  @HttpCode(HttpStatus.OK)
  async getMedical(
    @Request() request : any,
  ) {
    return this.patientService.getMedical(request);
  }

  @Get('/medical/:id')
  @HttpCode(HttpStatus.OK)
  async getMedicalDetail(
    @Param('id') id : number,
  ) {
    return this.patientService.getMedicalDetail(id);
  }
}
