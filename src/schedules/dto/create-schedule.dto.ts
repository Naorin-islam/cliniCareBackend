import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateDoctorScheduleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    doctorId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    dayOfWeek: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startTime: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    endTime: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isAvailable: boolean;
}
