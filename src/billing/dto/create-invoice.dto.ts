import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNumber, IsBoolean, IsOptional, IsDate, IsEnum, IsNotEmpty } from "class-validator";

export class CreateInvoiceDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    invoiceNumber: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    patientId: string;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    appointmentId?: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    doctorFee: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    labFee: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    medicineFee: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    roomFee: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    otherCharges: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    discount: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    paymentStatus: string;
}
