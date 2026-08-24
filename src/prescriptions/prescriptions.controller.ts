import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { PrescriptionsService } from "./prescriptions.service";
import { CreatePrescriptionItemDto } from "./dto/create-prescription-item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription-item.dto";

@ApiTags('Prescriptions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prescriptions')
export class PrescriptionsController {
      constructor(private readonly service: PrescriptionsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new PrescriptionItem' })
    create(@Body() createDto: CreatePrescriptionItemDto) {
        return this.service.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all PrescriptionItems' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a PrescriptionItem by id' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a PrescriptionItem' })
    update(@Param('id') id: string, @Body() updateDto: UpdatePrescriptionItemDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a PrescriptionItem' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
