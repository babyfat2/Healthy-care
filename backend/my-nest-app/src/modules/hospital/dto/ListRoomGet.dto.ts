import { IsEnum, IsOptional } from "class-validator";
import { PaginationAndSortDto } from "src/common/dto/PaginationAndSort.dto";
import {  EROOM, ESPECIALTIES, ESTAFF, ESTATUSWORK } from "src/global/globalEnum";




export class ListRoomGetDto extends PaginationAndSortDto {
    @IsOptional()
    @IsEnum(EROOM, { message: "role must be a valid enum value" })
    type: EROOM;

    @IsOptional()
    @IsEnum(ESPECIALTIES, { message: "role must be a valid enum value" })
    specialties?: ESPECIALTIES;

}