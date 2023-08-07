import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ReportService } from "./report.service";

@Controller("reports")
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async getAllReports() {
    try {
      const data = await this.reportService.getAll();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("create-report")
  async createReport(
    @Param() assignmentId: number,
    content: string,
    reportDate: string
  ) {
    try {
      const data = await this.reportService.create(
        assignmentId,
        content,
        reportDate
      );
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:id")
  async updateReport(
    @Param("id") id: number,
    @Body() content?: string,
    @Body() reportDate?: string
  ) {
    try {
      const data = await this.reportService.update(id, content, reportDate);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id")
  async detailReport(@Param("id") id: number) {
    try {
      const data = await this.reportService.getOneById(id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:id")
  async deleteReport(@Param("id") id: number) {
    try {
      const data = await this.reportService.delete(id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
