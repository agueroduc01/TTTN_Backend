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
import { DepartmentService } from "./department.service";

@Controller("department")
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  async getDepartments() {
    try {
      const data = await this.departmentService.getAll();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id")
  async detailDepartment(@Param("id") id: number) {
    try {
      const data = await this.departmentService.getDepartmentDetailById(id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("create-department")
  async createDepartment(@Body() dataInput: any) {
    try {
      const data = await this.departmentService.create(dataInput);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("/:id")
  async updateDepartment(@Param("id") id: number, @Body() dataInput: any) {
    try {
      const data = await this.departmentService.update(id, dataInput);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":/id")
  async deleteDepartment(id: number) {
    try {
      const data = await this.departmentService.delete(id);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
