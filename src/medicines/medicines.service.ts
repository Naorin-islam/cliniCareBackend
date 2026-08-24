import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Medicine } from "./entities/medicine.entity";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";

@Injectable()
export class MedicinesService {
      constructor(
        @InjectRepository(Medicine)
        private readonly repository: Repository<Medicine>,
      ) {}

    async create(createDto: CreateMedicineDto): Promise<Medicine> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Medicine[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Medicine> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Medicine with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateMedicineDto): Promise<Medicine> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
