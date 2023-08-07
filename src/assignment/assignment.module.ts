import { Module } from "@nestjs/common";
import { AssignmentController } from "./assignment.controller";
import { AssignmentService } from "./assignment.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  UserEntity,
  AssignmentsEntity,
  PartnersEntity,
  TripsEntity,
} from "src/entities";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TripsEntity,
      PartnersEntity,
      AssignmentsEntity,
      UserEntity,
    ]),
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  // exports: [TypeOrmModule, AssignmentService],
})
export class AssignmentModule {}
