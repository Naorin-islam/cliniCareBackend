import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentsController {
      constructor(private readonly service: DepartmentsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new Department' })
    create(@Body() createDto: CreateDepartmentDto) {
        return this.service.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Departments' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Department by id' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a Department' })
    update(@Param('id') id: string, @Body() updateDto: UpdateDepartmentDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Department' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
