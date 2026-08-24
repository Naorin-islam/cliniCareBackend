import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreatePatientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    patientCode: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    dateOfBirth?: Date;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    gender?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    bloodGroup?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    address?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    emergencyContact?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    allergies?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    medicalHistory?: string;
}
