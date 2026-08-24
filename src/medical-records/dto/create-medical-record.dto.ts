import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateMedicalRecordDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    patientId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    doctorId: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    appointmentId?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    visitDate: Date;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    symptoms?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    diagnosis: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    bloodPressure?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    temperature?: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    weight?: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    notes?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    followUpDate?: Date;
}
