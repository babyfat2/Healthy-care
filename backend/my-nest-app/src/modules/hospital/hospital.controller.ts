import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalAuthGuard } from 'src/guards/hospital-auth/hospital-auth.guard';
import { ListDoctorGetDto } from './dto/ListDotorGet.dto';
import { AuthGuard } from '@nestjs/passport';
import { ListRoomGetDto } from './dto/ListRoomGet.dto';
import { DoctorInviteDto } from './dto/DoctorInvite.dto';
import { RoomCreateDto } from './dto/RoomCreate.dto';
import { WorkDoctorGetDto } from './dto/WorkDoctorGet.dto';
import { WorkAddDto } from './dto/WorkAdd.dto';
import { WorkRoomGetDto } from './dto/WorkRoomGet.dto';

@Controller('hospital')
@UseGuards(AuthGuard('jwt'))
export class HospitalController {
  constructor(
    private readonly hospitalService: HospitalService) {

  }

  // lấy danh sách bác sĩ
  @UseGuards(HospitalAuthGuard)
  @Get('/doctor')
  @HttpCode(HttpStatus.OK)
  async getListDoctor(
    @Query() query: ListDoctorGetDto,
    @Request() request: any,
  ) {
    return this.hospitalService.getListDoctor(query, request);
  }

  // lấy chi tiết thông tin bác sĩ
  @UseGuards(HospitalAuthGuard)
  @Get('/doctor/:id')
  @HttpCode(HttpStatus.OK)
  async getDetailDoctor(
    @Param('id') id: number,
    @Request() request: any,
  ) {
    return this.hospitalService.getDetailDoctor(id, request);
  }

  // lấy lịch trực của bác sĩ
  @UseGuards(HospitalAuthGuard)
  @Get('/doctor/work/:id')
  @HttpCode(HttpStatus.OK)
  async getDoctor(
    @Param('id') id: number,
    @Query() time: WorkDoctorGetDto,
    @Request() request: any,
  ) {
    return this.hospitalService.getWorkDoctor(id, time, request);
  }


  // Mời bác sĩ làm việc tại bệnh viện
  @UseGuards(HospitalAuthGuard)
  @Post('/doctor')
  @HttpCode(HttpStatus.OK)
  async inviteDoctor(
    @Request() request: any,
    @Body() data: DoctorInviteDto,
  ) {
    return this.hospitalService.inviteDoctor(data,request)
  }

  // lấy danh sách phòng khám
  @UseGuards(HospitalAuthGuard)
  @Get('/room')
  @HttpCode(HttpStatus.OK)
  async getListRoom(
    @Query() query: ListRoomGetDto,
    @Request() request: any,
  ) {
    return this.hospitalService.getListRoom(query, request);
  }

  // tạo phòng khám mới
  @UseGuards(HospitalAuthGuard)
  @Post('/room')
  @HttpCode(HttpStatus.OK)
  async createRoom(
    @Body() body: RoomCreateDto,
    @Request() request: any,
  ) {
    return this.hospitalService.createRoom(body, request);
  }

  // lấy danh sách phòng khám
  @UseGuards(HospitalAuthGuard)
  @Get('/room/:id')
  @HttpCode(HttpStatus.OK)
  async getDetailRoom(
    @Param('id') id: number,
    @Request() request: any,
  ) {
    return this.hospitalService.getDetailRoom(id, request);
  }

  // lấy lịch trực của phòng khám
  @UseGuards(HospitalAuthGuard)
  @Get('/room/work/:id')
  @HttpCode(HttpStatus.OK)
  async getWorkRoom(
    @Param('id') id: number,
    @Query() time: WorkRoomGetDto,
    @Request() request: any,
  ) {
    return this.hospitalService.getWorkRoom(id, time, request);
  }


  // thêm lịch trực
  @UseGuards(HospitalAuthGuard)
  @Post('/work/:doctor_id/:room_id')
  @HttpCode(HttpStatus.OK)
  async addWork(
    @Param('doctor_id') doctor_id: number,
    @Param('room_id') room_id: number,
    @Body() data : WorkAddDto ,
    @Request() request: any,
  ) {
    return this.hospitalService.addWork(doctor_id, room_id, data,request);
  }

  // xóa lịch trực
  @UseGuards(HospitalAuthGuard)
  @Delete('/work/:work_id')
  @HttpCode(HttpStatus.OK)
  async deleteWork(
    @Param('work_id') work_id: number
  ) {
    return this.hospitalService.deleteWork(work_id);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getDoctorById(
    @Param('id') id: number,
  ) {
    return this
  }
}
