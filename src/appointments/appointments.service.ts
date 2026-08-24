import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Appointment } from "./entities/appointment.entity";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";

@Injectable()
export class AppointmentsService {
      constructor(
        @InjectRepository(Appointment)
        private readonly repository: Repository<Appointment>,
      ) {}

    async create(createDto: CreateAppointmentDto): Promise<Appointment> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Appointment[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Appointment> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Appointment with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateAppointmentDto): Promise<Appointment> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
