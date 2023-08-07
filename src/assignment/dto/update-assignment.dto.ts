import { OmitType } from "@nestjs/mapped-types";
import { CreateAssignmentDto } from "./create-assignment.dto";

export class UpdateAssignmentDto extends OmitType(
  CreateAssignmentDto,
  [] as const
) {
  id: number;
}
