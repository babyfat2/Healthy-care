import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { PatientDto } from "src/modules/pateint/patient.interface";



export class ConfirmProfileDto {
    @IsOptional()
    appointment_id?: number;

    @IsNotEmpty({ message: "thông tin bênh nhân là trường bắt buộc" })
    @ValidateNested()
    @Type(() => PatientDto)
    patient: PatientDto;

    @IsOptional()
    @IsNumber()
    user_id?: number;

    @IsNotEmpty({ message: 'room_id là trường bắt buộc'})
    @Type(() => Number)
    @IsNumber()
    room_id: number;

    @IsNotEmpty({ message: 'appointment_description là trường bắt buộc'})
    @IsString()
    appointment_description: string;
}