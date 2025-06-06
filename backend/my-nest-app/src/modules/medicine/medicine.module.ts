import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { Medicine } from 'src/entities/medicine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([Medicine]),
    ],
  controllers: [MedicineController],
  providers: [MedicineService],
})
export class MedicineModule {}
