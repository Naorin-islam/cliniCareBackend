import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LabReport } from "./entities/lab-report.entity";
import { CreateLabReportDto } from "./dto/create-lab-report.dto";
import { UpdateLabReportDto } from "./dto/update-lab-report.dto";

@Injectable()
export class LaboratoryService {
      constructor(
        @InjectRepository(LabReport)
        private readonly repository: Repository<LabReport>,
      ) {}

    async create(createDto: CreateLabReportDto): Promise<LabReport> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<LabReport[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<LabReport> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`LabReport with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateLabReportDto): Promise<LabReport> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
