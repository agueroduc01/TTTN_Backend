import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  Delete,
  Put,
} from "@nestjs/common";
import { AssignmentService } from "./assignment.service";
import { CreateAssignmentDto } from "./dto/create-assignment.dto";
import { UpdateAssignmentDto } from "./dto/update-assignment.dto";

@Controller("api/v1/assignments")
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  async getAll(@Query("sortDesc", ParseBoolPipe) sortDesc: boolean) {
    try {
      const data = await this.assignmentService.findAll();
      const assignments = data;
      if (sortDesc && sortDesc === true) {
        assignments.reverse();
      }
      return assignments;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Post("create-assignment")
  async createAssignment(@Body() createAssignmentDto: CreateAssignmentDto) {
    try {
      const data = await this.assignmentService.create(createAssignmentDto);
      return data;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Get("/:id")
  async detailAssignment(@Param("id") id: number) {
    try {
      const data = await this.assignmentService.getOneById(id);
      return data;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Put("/:id")
  async updateAssignment(
    @Param("id") id: number,
    @Body() updateAssignmentDto: UpdateAssignmentDto
  ) {
    try {
      const data = await this.assignmentService.update(
        +id,
        updateAssignmentDto
      );
      console.log(data);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete("/:id")
  async deleteAssignment(@Param("id") id: number) {
    try {
      const assignment = await this.assignmentService.delete(id);
      return assignment;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: `${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
