import { Module } from "@nestjs/common";
import { PartnerService } from "./partner.service";
import { PartnersController } from "./partner.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PartnersEntity } from "src/entities";

@Module({
  providers: [PartnerService],
  controllers: [PartnersController],
  imports: [TypeOrmModule.forFeature([PartnersEntity])],
})
export class PartnerModule {}
