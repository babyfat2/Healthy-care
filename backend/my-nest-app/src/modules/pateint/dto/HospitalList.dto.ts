import { Type } from "class-transformer";
import { IsNumber,  IsOptional,  Max, Min } from "class-validator";
import { PaginationAndSortDto } from "src/common/dto/PaginationAndSort.dto";



export class HospitalListDto extends PaginationAndSortDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Latitude phải là số' })
    @Min(-90, { message: 'Latitude không được nhỏ hơn -90' })
    @Max(90, { message: 'Latitude không được lớn hơn 90' })
    latitude: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber({}, { message: 'Longitude phải là số' })
    @Min(-180, { message: 'Longitude không được nhỏ hơn -180' })
    @Max(180, { message: 'Longitude không được lớn hơn 180' })
    longitude: number;
}