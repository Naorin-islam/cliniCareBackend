import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingService } from "./billing.service";
import { BillingController } from "./billing.controller";
import { Invoice } from "./entities/invoice.entity";

@Module({
      imports: [TypeOrmModule.forFeature([Invoice])],
      controllers: [BillingController],
      providers: [BillingService],
      exports: [BillingService],
    })
export class BillingModule {
}
