import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class AddPrescriptionDto {
    @IsNotEmpty({ message: 'patient_id should be not empty' })
    @Type(() => Number)
    @IsNumber()
    patient_id: number;

    @IsNotEmpty({ message: 'prescription_id should be not empty' })
    @IsString()
    prescription_id: string;

    @IsNotEmpty({ message: 'diagnosis should be not empty' })
    @IsString()
    diagnosis: string;

    @IsArray({ message: 'medicine_prescription must be an array' })
    @ArrayNotEmpty({ message: 'medicine_prescription should not be empty' })
    @ValidateNested({ each: true })
    @Type(() => MedicinePrescriptionDto) 
    medicine_prescription: MedicinePrescriptionDto[];

}

export class MedicinePrescriptionDto {
    @IsNotEmpty({ message: 'medicine_id should be not empty' })
    @Type(() => Number)
    @IsNumber()
    medicine_id: number;

    @IsNotEmpty({ message: 'amount should be not empty' })
    @Type(() => Number)
    @IsNumber()
    amount: number;

    @IsNotEmpty({ message: 'timesPerDay should be not empty' })
    @Type(() => Number)
    @IsNumber()
    timesPerDay: number;

    @IsNotEmpty({ message: 'doseQuantity should be not empty' })
    @Type(() => Number)
    @IsNumber()
    doseQuantity: number;

    @IsNotEmpty({ message: 'note should be not empty' })
    @IsString()
    note: string;
}