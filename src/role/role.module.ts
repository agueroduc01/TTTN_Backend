import { Module } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleController } from "./role.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "src/entities";

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([RoleEntity])],
})
export class RoleModule {}
