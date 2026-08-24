import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MedicalRecord } from "./entities/medical-record.entity";
import { CreateMedicalRecordDto } from "./dto/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical-record.dto";

@Injectable()
export class MedicalRecordsService {
      constructor(
        @InjectRepository(MedicalRecord)
        private readonly repository: Repository<MedicalRecord>,
      ) {}

    async create(createDto: CreateMedicalRecordDto): Promise<MedicalRecord> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<MedicalRecord[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<MedicalRecord> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`MedicalRecord with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateMedicalRecordDto): Promise<MedicalRecord> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
