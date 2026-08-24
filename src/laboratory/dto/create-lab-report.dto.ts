import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateLabReportDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    testId: string;
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
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    result?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    remarks?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    completedAt?: Date;
}
