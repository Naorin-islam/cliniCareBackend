import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationsService {
      constructor(
        @InjectRepository(Notification)
        private readonly repository: Repository<Notification>,
      ) {}

    async create(createDto: CreateNotificationDto): Promise<Notification> {
        const entity = this.repository.create(createDto as any);
        return this.repository.save(entity as any);
    }

    async findAll(): Promise<Notification[]> {
        return this.repository.find();
    }

    async findOne(id: string): Promise<Notification> {
        const entity = await this.repository.findOne({ where: { id } as any });
        if (!entity) throw new NotFoundException(`Notification with id ${id} not found`);
        return entity;
    }

    async update(id: string, updateDto: UpdateNotificationDto): Promise<Notification> {
        const entity = await this.findOne(id);
        Object.assign(entity as any, updateDto as any);
        return this.repository.save(entity as any);
    }

    async remove(id: string): Promise<void> {
        const entity = await this.findOne(id);
        await this.repository.remove(entity);
    }
}
