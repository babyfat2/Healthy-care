import { IsNotEmpty, IsOptional } from "class-validator";
import { IsTimeFormat } from "src/global/dto/IsTimeFormat";




export class WorkDoctorGetDto {
    @IsOptional()
    @IsTimeFormat({ message: 'Time phải đúng định dạng MM-YYYY' })
    time: string;
}

  
