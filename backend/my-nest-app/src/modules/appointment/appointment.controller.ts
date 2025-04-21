import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { HospitalReceptionAuthGuard } from 'src/guards/hospital-reception/hospital-reception.guard';
import { AppointmentChangeDto } from './dto/AppointmentChange.dto';


@Controller('appointment')
@UseGuards(AuthGuard('jwt'))
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  @UseGuards(HospitalReceptionAuthGuard)
  @Get('')
  @HttpCode(HttpStatus.OK)
  async getListAppointment(
    @Query() query: PaginationDto,
    @Request() request: any,
  ) {
    return this.appointmentService.getListAppointment(query, request);
  }

  @UseGuards(HospitalReceptionAuthGuard)
  @Post('')
  @HttpCode(HttpStatus.OK)
  async changeAppointment(
    @Body() body: AppointmentChangeDto,
    @Request() request: any,
  ) {
    return this.appointmentService.changeAppointment(body, request);
  }

  @UseGuards(HospitalReceptionAuthGuard)
  @Get('/detail')
  @HttpCode(HttpStatus.OK)
  async getDetailAppointment(
    @Request() request: any,
  ) {
    return this.appointmentService.getDetailAppointment(request);
  }
}
