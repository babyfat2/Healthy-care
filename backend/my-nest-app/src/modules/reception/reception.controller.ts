import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { ReceptionAuthGuard } from 'src/guards/reception/reception.guard';
import { ConfirmProfileDto } from './dto/confirmProfile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('reception')
@UseGuards(AuthGuard('jwt'))
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

    // lấy danh sách phòng khám
    @UseGuards(ReceptionAuthGuard)
    @Post('/confirmProfile')
    @HttpCode(HttpStatus.OK)
    async getListRoom(
      @Body() body: ConfirmProfileDto,
      @Request() request: any,
    ) {
      return this.receptionService.confirmProfile(body, request);
    }
}
