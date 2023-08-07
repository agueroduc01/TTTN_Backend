import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AssignmentsEntity, ReportsEntity } from "../entities";

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  imports: [TypeOrmModule.forFeature([ReportsEntity, AssignmentsEntity])],
})
export class ReportModule {}
