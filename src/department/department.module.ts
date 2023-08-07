import { Module } from "@nestjs/common";
import { DepartmentService } from "./department.service";
import { DepartmentController } from "./department.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DepartmentEntity } from "src/entities";

@Module({
  providers: [DepartmentService],
  controllers: [DepartmentController],
  imports: [TypeOrmModule.forFeature([DepartmentEntity])],
})
export class DepartmentModule {}
