import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { SchedulesService } from "./schedules.service";
import { CreateDoctorScheduleDto } from "./dto/create-schedule.dto";
import { UpdateDoctorScheduleDto } from "./dto/update-schedule.dto";

@ApiTags('Schedules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('schedules')
export class SchedulesController {
      constructor(private readonly service: SchedulesService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new DoctorSchedule' })
    create(@Body() createDto: CreateDoctorScheduleDto) {
        return this.service.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all DoctorSchedules' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a DoctorSchedule by id' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a DoctorSchedule' })
    update(@Param('id') id: string, @Body() updateDto: UpdateDoctorScheduleDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a DoctorSchedule' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
