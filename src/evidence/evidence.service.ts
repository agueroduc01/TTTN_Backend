import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EvidencesEntity } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class EvidenceService {
  constructor(
    @InjectRepository(EvidencesEntity)
    private readonly evidenceRepository: Repository<EvidencesEntity>
  ) {}

  async getAll() {
    return await this.evidenceRepository.find({ relations: ["reportId"] });
  }

  async getOneById(id: number) {
    try {
      //   const evidence = await this.evidenceRepository.findOneByOrFail({ id });
      const data = await this.evidenceRepository.findOne({
        relations: ["reportId"],
        where: { id },
      });
      if (data) {
        return data;
      } else {
        throw new Error(`Could not find evidence`);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data?: any) {
    const evidence = this.evidenceRepository.create(data);
    return await this.evidenceRepository.save(evidence);
  }

  async update(id: number, data?: any) {
    const evidence = await this.getOneById(id);
    return this.evidenceRepository.save({ ...evidence, ...data }); // UPDATE
  }

  async delete(id: number) {
    const evidence = await this.getOneById(id);
    return await this.evidenceRepository.remove(evidence);
  }
}
