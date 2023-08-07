import { IsNotEmpty } from "class-validator";
import { TripsEntity, UserEntity } from "src/entities";

export class CreateAssignmentDto {
  @IsNotEmpty()
  task: string;
  expectedResult: string;
  @IsNotEmpty()
  employeeId: UserEntity;
  @IsNotEmpty()
  tripId: TripsEntity;
  // tripId: number;
}
