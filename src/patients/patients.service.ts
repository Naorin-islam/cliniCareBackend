import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Patient } from "./entities/patient.entity";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@Injectable()
export class PatientsService {
      constructor(
        @InjectRepository(Patient)
        private readonly repository: Repository<Patient>,
      ) {}

    async create(createDto: CreatePatientDto): Promise<Patient> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Patient[]> {
    return this.repository.find({ relations: { user: true } });
    }

    async findOne(id: string): Promise<Patient> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Patient with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdatePatientDto): Promise<Patient> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
