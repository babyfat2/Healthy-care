import { Transform } from "class-transformer";
import { IsDateString, IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/Pagination.dto";
import { ESTATUSAPOINTMENT } from "src/global/globalEnum";



export class AppointmentListDto extends PaginationDto {
    @IsOptional()
    @IsEnum(ESTATUSAPOINTMENT, { message: "status không hợp lệ" })
    status: ESTATUSAPOINTMENT;

    @IsOptional({ message: "end_at là trường bắt buộc" })
    @IsDateString({}, { message: 'start_at phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    time: string;
}