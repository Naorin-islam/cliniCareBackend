import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Bed } from "./entities/bed.entity";
import { CreateBedDto } from "./dto/create-bed.dto";
import { UpdateBedDto } from "./dto/update-bed.dto";

@Injectable()
export class BedsService {
      constructor(
        @InjectRepository(Bed)
        private readonly repository: Repository<Bed>,
      ) {}

    async create(createDto: CreateBedDto): Promise<Bed> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Bed[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Bed> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Bed with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateBedDto): Promise<Bed> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
