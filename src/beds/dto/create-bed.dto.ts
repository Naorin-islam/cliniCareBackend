import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateBedDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    bedNumber: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    roomId: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    status: string;
}
