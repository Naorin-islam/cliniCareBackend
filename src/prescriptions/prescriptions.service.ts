import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PrescriptionItem } from "./entities/prescription-item.entity";
import { CreatePrescriptionItemDto } from "./dto/create-prescription-item.dto";
import { UpdatePrescriptionItemDto } from "./dto/update-prescription-item.dto";

@Injectable()
export class PrescriptionsService {
      constructor(
        @InjectRepository(PrescriptionItem)
        private readonly repository: Repository<PrescriptionItem>,
      ) {}

    async create(createDto: CreatePrescriptionItemDto): Promise<PrescriptionItem> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<PrescriptionItem[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<PrescriptionItem> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`PrescriptionItem with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdatePrescriptionItemDto): Promise<PrescriptionItem> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
