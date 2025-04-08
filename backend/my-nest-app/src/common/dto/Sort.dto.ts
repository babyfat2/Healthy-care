import { IsOptional, IsString, IsNumber, IsEnum, Min, IsInt, Max, IsIn } from 'class-validator';
import { Transform, Type } from 'class-transformer';


export class SortDto {
  @IsOptional()
  @IsInt({ message: "Sort_col bắt buộc phải là kiểu số" })
  sortCol?: number;

  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? Number(value) : undefined))
  @IsInt({ message: "Sort bắt buộc phải là kiểu số" })
  @IsIn([1, 2], { message: "Sort chỉ nhận 2 giá trị là 1 (ASC) và 2 (DESC)" })
  sort?: number; 

}