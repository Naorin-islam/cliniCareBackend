import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AdmissionsService } from "./admissions.service";
import { CreateAdmissionDto } from "./dto/create-admission.dto";
import { UpdateAdmissionDto } from "./dto/update-admission.dto";

@ApiTags('Admissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('admissions')
export class AdmissionsController {
      constructor(private readonly service: AdmissionsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new Admission' })
    create(@Body() createDto: CreateAdmissionDto) {
        return this.service.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Admissions' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Admission by id' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a Admission' })
    update(@Param('id') id: string, @Body() updateDto: UpdateAdmissionDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Admission' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
