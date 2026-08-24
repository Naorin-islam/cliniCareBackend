import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Invoice } from "./entities/invoice.entity";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";

@Injectable()
export class BillingService {
      constructor(
        @InjectRepository(Invoice)
        private readonly repository: Repository<Invoice>,
      ) {}

    async create(createDto: CreateInvoiceDto): Promise<Invoice> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Invoice[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Invoice> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Invoice with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateInvoiceDto): Promise<Invoice> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
