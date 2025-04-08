import { IsEnum, IsNotEmpty,  IsOptional,  IsString, ValidateIf } from "class-validator";
import { EROOM, ESPECIALTIES } from "src/global/globalEnum";



export class RoomCreateDto {
    @IsNotEmpty({ message: "email là bắt buộc" })
    @IsString({ message: "name_building phải là string" })
    name_building: string;

    @IsNotEmpty({ message: "start_at là bắt buộc" })
    @IsString({ message: "room_number phải là string" })
    room_number: string;

    @IsNotEmpty({ message: "room_type là bắt buộc" })
    @IsEnum(EROOM, { message: "room_type phải là một giá trị hợp lệ của EROOM" })
    room_type: EROOM;


    @IsOptional()
    @IsEnum(ESPECIALTIES, { message: "specialties phải là một giá trị hợp lệ của ESPECIALTIES" })
    specialties: ESPECIALTIES;
}