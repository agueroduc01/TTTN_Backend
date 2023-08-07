import { Module } from "@nestjs/common";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";
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
  controllers: [TripsController],
  providers: [TripsService],
  // exports: [TypeOrmModule, TripsService],
})
export class TripsModule {}
