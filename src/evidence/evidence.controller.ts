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
import { EvidenceService } from "./evidence.service";

@Controller("evidence")
export class EvidenceController {
  constructor(private evidenceService: EvidenceService) {}

  @Get()
  async getEvidences() {
    try {
      const data = await this.evidenceService.getAll();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id")
  async detailEvidence(@Param("id") id: number) {
    try {
      const data = await this.evidenceService.getOneById(id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("create-evidence")
  async createEvidence(@Body() dataInput?: any) {
    try {
      const data = await this.evidenceService.create(dataInput);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:id")
  async updateEvidence(@Param("id") id: number, @Body() dataInput?: any) {
    try {
      console.log(dataInput);
      const data = await this.evidenceService.update(id, dataInput);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete("/:id")
  async deleteEvidence(@Param("id") id: number) {
    try {
      const data = await this.evidenceService.delete(id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
