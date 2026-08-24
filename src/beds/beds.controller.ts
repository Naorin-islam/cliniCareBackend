import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { BedsService } from "./beds.service";
import { CreateBedDto } from "./dto/create-bed.dto";
import { UpdateBedDto } from "./dto/update-bed.dto";

@ApiTags('Beds')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('beds')
export class BedsController {
      constructor(private readonly service: BedsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new Bed' })
    create(@Body() createDto: CreateBedDto) {
        return this.service.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Beds' })
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Bed by id' })
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a Bed' })
    update(@Param('id') id: string, @Body() updateDto: UpdateBedDto) {
        return this.service.update(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a Bed' })
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
