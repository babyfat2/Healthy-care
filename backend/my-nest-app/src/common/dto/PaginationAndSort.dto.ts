import { IsOptional, IsString, IsNumber, Min, IsInt, Max, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';


export class PaginationAndSortDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @Transform(({ value }) => (value ? Number(value) : 1)) // Mặc định page = 1
    page: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => (value ? Number(value) : 20)) // Mặc định row = 20
    row: number = 20;

    @IsOptional()
    @IsInt({ message: "sortCol bắt buộc phải là kiểu số" })
    sortCol?: number;

    @IsOptional()
    @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
    @IsInt({ message: "Sort bắt buộc phải là kiểu số" })
    @IsIn([1, 2], { message: "Sort chỉ nhận 2 giá trị là 1 (ASC) và 2 (DESC)" })
    sort?: number;
}