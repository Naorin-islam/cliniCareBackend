import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PrescriptionsService } from "./prescriptions.service";
import { PrescriptionsController } from "./prescriptions.controller";
import { PrescriptionItem } from "./entities/prescription-item.entity";

@Module({
      imports: [TypeOrmModule.forFeature([PrescriptionItem])],
      controllers: [PrescriptionsController],
      providers: [PrescriptionsService],
      exports: [PrescriptionsService],
    })
export class PrescriptionsModule {
}
