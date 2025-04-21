import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ESTATUSAPOINTMENT } from "src/global/globalEnum";



export class AppointmentChangeDto {
    @IsNotEmpty({message: "appointment_id là trường bắt buộc"})
    @Type(() => Number)
    @IsNumber()
    appointment_id: number;

    @IsNotEmpty({message: "status là bắt buộc"})
    @IsEnum(ESTATUSAPOINTMENT, {message: "status không hợp lệ"})
    status: ESTATUSAPOINTMENT;
}