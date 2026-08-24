import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Department } from "./entities/department.entity";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";

@Injectable()
export class DepartmentsService {
      constructor(
        @InjectRepository(Department)
        private readonly repository: Repository<Department>,
      ) {}

    async create(createDto: CreateDepartmentDto): Promise<Department> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Department[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Department> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Department with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateDepartmentDto): Promise<Department> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
