import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssignmentsEntity } from "src/entities";
import { Repository } from "typeorm";
import { CreateAssignmentDto } from "./dto/create-assignment.dto";
import { UpdateAssignmentDto } from "./dto/update-assignment.dto";

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentsEntity)
    private readonly assignmentRepository: Repository<AssignmentsEntity>
  ) {}

  async findAll() {
    return await this.assignmentRepository.find({
      relations: ["tripId", "employeeId"],
    });
  }

  create(createAssignmentDto: CreateAssignmentDto) {
    const newAssignment = this.assignmentRepository.create(createAssignmentDto);
    return this.assignmentRepository.save(newAssignment); // Insert
  }

  async getOneById(id: number): Promise<AssignmentsEntity> {
    try {
      const assignment = await this.assignmentRepository.findOneByOrFail({
        id,
      }); // select * from assignments where user.id = id
      return assignment;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const assignment = await this.getOneById(id);
    return this.assignmentRepository.save({
      ...assignment,
      ...updateAssignmentDto,
    }); // UPDATE
  }

  async delete(id: number) {
    const assignment = await this.getOneById(id);
    return this.assignmentRepository.remove(assignment);
  }
}
