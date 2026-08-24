import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateAdmissionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    patientId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    doctorId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bedId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    admissionDate: Date;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    dischargeDate?: Date;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    reason?: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    notes?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;
}
