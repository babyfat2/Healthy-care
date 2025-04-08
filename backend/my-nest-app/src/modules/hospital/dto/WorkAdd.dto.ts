import { Transform, Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, ValidateIf } from "class-validator";




export class WorkAddDto {

    @IsNotEmpty({ message: "is_range không được để trống"})
    is_range: boolean;


    @ValidateIf((o) => o.is_range === true)
    @IsNotEmpty({message: "start_at là trường bắt buộc"})
    @IsDateString({}, { message: 'start_at phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    start_at: string;

    @ValidateIf((o) => o.is_range === true)
    @IsNotEmpty({ message: "end_at là trường bắt buộc"})
    @IsDateString({}, { message: 'start_at phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    end_at: string;

    @ValidateIf((o) => o.is_range === false)
    @IsNotEmpty()
    @IsDateString({}, { message: 'start_at phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    time: string;
}   