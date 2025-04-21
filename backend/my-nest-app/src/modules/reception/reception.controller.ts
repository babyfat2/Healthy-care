import { Controller, Get, HttpCode, HttpStatus, Query, Request } from '@nestjs/common';
import { ReceptionService } from './reception.service';
import { query } from 'express';
import { PaginationDto } from 'src/common/dto/Pagination.dto';
import { request } from 'http';

@Controller('reception')
export class ReceptionController {
  constructor(private readonly receptionService: ReceptionService) {}

}
