import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateMedicineDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    genericName?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    manufacturer?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    expiryDate?: Date;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;
}
