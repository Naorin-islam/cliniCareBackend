import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreatePrescriptionItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    prescriptionId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    medicineId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dosage: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    frequency: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    duration: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    instructions?: string;
}
