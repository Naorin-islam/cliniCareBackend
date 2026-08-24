import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Doctor } from "./entities/doctor.entity";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

@Injectable()
export class DoctorsService {
      constructor(
        @InjectRepository(Doctor)
        private readonly repository: Repository<Doctor>,
      ) {}

    async create(createDto: CreateDoctorDto): Promise<Doctor> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Doctor[]> {
        return this.repository.find({ relations: ['user', 'department'] });
    }

    async findOne(id: string): Promise<Doctor> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Doctor with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateDoctorDto): Promise<Doctor> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
