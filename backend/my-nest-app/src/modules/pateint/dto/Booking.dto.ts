import { Transform, Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";




export class BookingDto {
    @IsNotEmpty({ message: 'appointment_time không được bỏ trống' })
    @IsDateString({}, { message: 'appointment_time phải là ngày hợp lệ (ISO format)' })
    @Transform(({ value }) => value.split('T')[0]) // giữ lại phần YYYY-MM-DD
    appointment_time: Date;

    @IsNotEmpty({ message: "description không được để trống" })
    @IsString({ message: "description phải ở ddingj dạng text" })
    description: string;

    @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
    @IsString({ message: 'Số điện thoại phải là chuỗi văn bản' })
    @Matches(/^(0|\+84)[0-9]{9}$/, {
        message: 'Số điện thoại không hợp lệ. Ví dụ: 0912345678 hoặc +84912345678',
    })
    phone: string;

    @IsNotEmpty({ message: 'hospital_id không được bỏ trống' })
    @Type(() => Number)
    @IsNumber({}, { message: "hospital_id phải là kiểu số" })
    hospital_id: number;
}