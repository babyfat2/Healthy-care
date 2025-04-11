import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationAndSortDto } from 'src/common/dto/PaginationAndSort.dto';
import { Patient } from 'src/entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PateintService {
    constructor(
            @InjectRepository(Patient)
            private readonly pateintRepository: Repository<Patient>,
        ) { }
    

        async getListHospital (query: PaginationAndSortDto) {
            
        }
}
