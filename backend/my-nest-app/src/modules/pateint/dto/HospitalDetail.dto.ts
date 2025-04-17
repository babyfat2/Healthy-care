import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";




export class HospitalDetailDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber({}, { message: 'id phải là số' })
    id: number;

}