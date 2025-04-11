import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PateintService } from './pateint.service';
import { PaginationAndSortDto } from 'src/common/dto/PaginationAndSort.dto';

@Controller('pateint')
export class PateintController {
  constructor(private readonly pateintService: PateintService) {}

  @Get('')
      @HttpCode(HttpStatus.OK)
      async getListHopital(
        @Query() query : PaginationAndSortDto,
      ) {
        return this.pateintService.getListHospital(query);
      }
}
