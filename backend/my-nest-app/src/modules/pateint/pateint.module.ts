import { Module } from '@nestjs/common';
import { PateintService } from './pateint.service';
import { PateintController } from './pateint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
        TypeOrmModule.forFeature([]),
      ],
  controllers: [PateintController],
  providers: [PateintService],
})
export class PateintModule {}
