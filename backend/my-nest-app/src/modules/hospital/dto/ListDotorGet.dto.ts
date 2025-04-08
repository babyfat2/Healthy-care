import { IsEnum, IsOptional } from "class-validator";
import { PaginationAndSortDto } from "src/common/dto/PaginationAndSort.dto";
import { EROLE, ESPECIALTIES, ESTAFF, ESTATUS, ESTATUSWORK } from "src/global/globalEnum";




export class ListDoctorGetDto extends PaginationAndSortDto {
    @IsOptional()
    @IsEnum(ESTAFF, { message: "role must be a valid enum value" })
    role?: ESTAFF;

    @IsOptional()
    @IsEnum(ESPECIALTIES, { message: "role must be a valid enum value" })
    specialties?: ESPECIALTIES;

    @IsOptional()
    @IsEnum(ESTATUSWORK, { message: "role must be a valid enum value" })
    status?: ESTATUSWORK;
}