import { Transform, Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber,  IsOptional,  IsString,  Max, Min } from "class-validator";




export class BookingDto {
    @IsNotEmpty({message: 'appointment_time không được bỏ trống'})
    @IsDateString({}, { message: 'appointment_time phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    appointment_time: Date;

    @IsNotEmpty({message: "description không được để trống"})
    @IsString({message: "description phải ở ddingj dạng text"})
    description: string;

    @IsNotEmpty({message: 'hospital_id không được bỏ trống'})
    @Type(() => Number)
    @IsNumber({},{message: "hospital_id phải là kiểu số"})
    hospital_id: number;
}