import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PartnersEntity } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(PartnersEntity)
    private readonly partnerRepository: Repository<PartnersEntity>
  ) {}

  async getAll() {
    return await this.partnerRepository.find();
  }

  async getOneById(id: number) {
    try {
      const partner = await this.partnerRepository.findOneByOrFail({ id });
      return partner;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: any) {
    const partner = this.partnerRepository.create(data);
    return await this.partnerRepository.save(partner);
  }

  async update(id: number, data: any) {
    const partner = this.getOneById(id);
    if (partner) {
      return await this.partnerRepository.save({ ...partner, ...data });
    }
    return partner;
  }

  async delete(id: number) {
    const partner = await this.getOneById(id);
    return await this.partnerRepository.remove(partner);
  }
}
