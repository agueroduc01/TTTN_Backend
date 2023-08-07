import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportsEntity } from "src/entities";
import { Repository } from "typeorm";

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportsEntity)
    private readonly reportRepository: Repository<ReportsEntity>
  ) {}

  async getAll(): Promise<ReportsEntity[]> {
    return await this.reportRepository.find({ relations: ["assignmentId"] });
  }

  async create(
    assignmentId: number,
    content: string,
    reportDate: string
  ): Promise<ReportsEntity> {
    const report = this.reportRepository.create({
      assignmentId,
      content,
      reportDate,
    });

    return await this.reportRepository.save(report);
  }

  async getOneById(id: number): Promise<ReportsEntity> {
    try {
      const report = await this.reportRepository.findOneByOrFail({ id });
      return report;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, content?: string, reportDate?: string) {
    const report = await this.getOneById(id);
    if (!(content !== null && reportDate !== null)) {
      return await this.reportRepository.save({
        ...report,
        content,
        reportDate,
      });
    }
    return report;
  }

  async delete(id: number) {
    const report = await this.getOneById(id);
    return await this.reportRepository.remove(report);
  }
}
