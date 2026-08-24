import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateDoctorDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    departmentId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    specialization: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    qualification?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    experience: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    consultationFee: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;
}
