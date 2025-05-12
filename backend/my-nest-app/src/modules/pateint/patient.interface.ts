import { Transform, Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";



export class PatientDto {
    @IsOptional({ message: "id là trường bắt buộc"})
    @Type(() => Number)
    @IsNumber({}, {message: "id bắt buộc phải là kiểu số"})
    id?: number;
  
    @IsNotEmpty({message: 'citizen_identification_id không được bỏ trống'})
    @IsString()
    citizen_identification_id: string;
  
    @IsNotEmpty({message: "full_name không được bỏ trống"})
    @IsString()
    full_name: string;
  
    @IsNotEmpty({ message: "address không được bỏ trống"})
    @IsString()
    address: string;
  
    @IsNotEmpty({ message: "hometown(quê quán) không được bỏ trống"})
    @IsString()
    hometown: string;
  
    @IsNotEmpty({ message: "birth không được bỏ trống"})
    @IsDateString({}, { message: 'appointment_time phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    birthday: Date;
  
    @IsNotEmpty({message : "ethnicity không được bỏ trống"})
    @IsString()
    ethnicity: string;
  
    @IsNotEmpty({message: "issued_date không được bỏ trống"})
    @IsDateString({}, { message: 'issued_date phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    issued_date: Date;
  
    @IsNotEmpty({message: "issued_placce không được bỏ trống"})
    @IsString()
    issued_place: string;
  
    @IsNotEmpty({message: "phone số điện thoại không được bỏ trống"})
    @IsPhoneNumber('VN')
    phone: string;
}