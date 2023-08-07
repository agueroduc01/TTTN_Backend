import { IsDate, IsNotEmpty } from "class-validator";
import { UserEntity } from "src/entities";

export class CreateTripDto {
  @IsNotEmpty()
  destination: string;
  // managerId: number;
  managerId: UserEntity;
  partnerId: number;
  @IsNotEmpty()
  content: string;
  // @IsDate()
  departureDate: string;
  // @IsDate()
  returnDate: string;
}
