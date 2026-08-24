import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    headDoctorId?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;
}
