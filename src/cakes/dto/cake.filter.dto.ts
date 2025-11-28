// export class CakesFilterDto {
//   name?: string | null;
//   minPrice?: number | null;
//   maxPrice?: number | null;
//   categoryId?: number | null;
//   search?: string | null;
// }
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
export class CakesFilterDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  categoryId?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  limit?: number;
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  page?: number;
}
