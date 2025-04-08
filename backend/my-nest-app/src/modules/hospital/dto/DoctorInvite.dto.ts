import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";



export class DoctorInviteDto {
    @IsNotEmpty({message: "email là bắt buộc"})
    @IsEmail()
    email: string;

    @IsNotEmpty({message: "start_at là bắt buộc"})
    @Type(() => Date)
    @IsDate()
    start_at: Date;
}