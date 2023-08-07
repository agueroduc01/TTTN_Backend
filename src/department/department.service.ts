import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DepartmentEntity } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>
  ) {}

  async getAll() {
    return await this.departmentRepository.find({ relations: ["managerId"] });
  }

  async getOneById(id: number) {
    try {
      const department = await this.departmentRepository.findOneByOrFail({
        id,
      });
      return department;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDepartmentDetailById(id: number) {
    const department = await this.departmentRepository.findOne({
      relations: ["managerId"],
      where: { id },
    });
    if (department) {
      return department;
    } else {
      throw new Error(`Could not find department`);
    }
  }

  async create(data: any) {
    const department = this.departmentRepository.create(data);
    return await this.departmentRepository.save(department);
  }

  async update(id: number, data?: any) {
    const department = await this.getOneById(id);
    if (data) {
      return await this.departmentRepository.save({ ...department, ...data });
    }
    return department;
  }

  async delete(id: number) {
    const department = await this.getOneById(id);
    return await this.departmentRepository.remove(department);
  }
}
