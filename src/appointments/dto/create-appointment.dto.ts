import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateAppointmentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    appointmentCode: string;
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
    departmentId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    appointmentDate: Date;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    appointmentTime: string;
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
