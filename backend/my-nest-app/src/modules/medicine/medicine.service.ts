import { HttpCode, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationAndSortDto } from 'src/common/dto/PaginationAndSort.dto';
import { Medicine } from 'src/entities/medicine.entity';
import { PaginationResponse, ResponseData } from 'src/global/globalClass';
import { HttpStatusCode } from 'src/global/globalMessage';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class MedicineService {
    constructor(
        @InjectRepository(Medicine)
        private readonly medicineRepository: Repository<Medicine>,
    ) { }

    async getListMedicine(data: PaginationAndSortDto) {

        const whereCondition: any = {}; // Khởi tạo object điều kiện

        if (data.search) {
            whereCondition.name = ILike(`%${data.search}%`); // Tìm kiếm theo tên phòng
        }

        const medicine = await this.medicineRepository.find({
            where: whereCondition, // Tìm kiếm theo tên phòng
        });

        return new ResponseData(
            medicine,
            HttpStatusCode.SUCCESS,
            "get medicine successed",
        )
    }
}
