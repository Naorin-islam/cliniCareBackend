import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admission } from "./entities/admission.entity";
import { CreateAdmissionDto } from "./dto/create-admission.dto";
import { UpdateAdmissionDto } from "./dto/update-admission.dto";

@Injectable()
export class AdmissionsService {
      constructor(
        @InjectRepository(Admission)
        private readonly repository: Repository<Admission>,
      ) {}

    async create(createDto: CreateAdmissionDto): Promise<Admission> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Admission[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Admission> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Admission with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateAdmissionDto): Promise<Admission> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
