import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DoctorSchedule } from "./entities/schedule.entity";
import { CreateDoctorScheduleDto } from "./dto/create-schedule.dto";
import { UpdateDoctorScheduleDto } from "./dto/update-schedule.dto";

@Injectable()
export class SchedulesService {
      constructor(
        @InjectRepository(DoctorSchedule)
        private readonly repository: Repository<DoctorSchedule>,
      ) {}

    async create(createDto: CreateDoctorScheduleDto): Promise<DoctorSchedule> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<DoctorSchedule[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<DoctorSchedule> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`DoctorSchedule with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateDoctorScheduleDto): Promise<DoctorSchedule> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
