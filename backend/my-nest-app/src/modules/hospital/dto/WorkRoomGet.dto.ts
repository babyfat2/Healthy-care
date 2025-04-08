import { IsOptional } from "class-validator";
import { IsTimeFormat } from "src/global/dto/IsTimeFormat";




export class WorkRoomGetDto {
    @IsOptional()
    @IsTimeFormat({ message: 'Time phải đúng định dạng MM-YYYY' })
    time: string;
}