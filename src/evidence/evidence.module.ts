import { Module } from "@nestjs/common";
import { EvidenceController } from "./evidence.controller";
import { EvidenceService } from "./evidence.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EvidencesEntity } from "src/entities";

@Module({
  controllers: [EvidenceController],
  imports: [TypeOrmModule.forFeature([EvidencesEntity])],
  providers: [EvidenceService],
})
export class EvidenceModule {}
