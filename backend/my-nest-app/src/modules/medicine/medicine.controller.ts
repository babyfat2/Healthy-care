import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { PaginationAndSortDto } from 'src/common/dto/PaginationAndSort.dto';

@Controller('medicine')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

   @Get('')
    @HttpCode(HttpStatus.OK)
    async getListRoom(
      @Query() query : PaginationAndSortDto,
    ) {
      return this.medicineService.getListMedicine(query);
    }
}
