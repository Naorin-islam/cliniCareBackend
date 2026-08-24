import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { LaboratoryService } from "./laboratory.service";
import { CreateLabReportDto } from "./dto/create-lab-report.dto";
import { UpdateLabReportDto } from "./dto/update-lab-report.dto";

@ApiTags('Laboratory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('laboratory')
export class LaboratoryController {
      constructor(private readonly service: LaboratoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new LabReport' })
    create(@Body() createDto: CreateLabReportDto) {
        return this.service.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all LabReports' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a LabReport by id' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a LabReport' })
    update(@Param('id') id: string, @Body() updateDto: UpdateLabReportDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a LabReport' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
