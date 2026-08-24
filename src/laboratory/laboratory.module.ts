import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LaboratoryService } from "./laboratory.service";
import { LaboratoryController } from "./laboratory.controller";
import { LabReport } from "./entities/lab-report.entity";

@Module({
      imports: [TypeOrmModule.forFeature([LabReport])],
      controllers: [LaboratoryController],
      providers: [LaboratoryService],
      exports: [LaboratoryService],
    })
export class LaboratoryModule {
}
