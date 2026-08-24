import { PartialType } from "@nestjs/swagger";
import { CreateDoctorScheduleDto } from "./create-schedule.dto";

export class UpdateDoctorScheduleDto extends PartialType(CreateDoctorScheduleDto) {
}
