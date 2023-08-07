import { OmitType } from "@nestjs/mapped-types";
import { CreateTripDto } from "./create-trip.dto";

export class UpdateTripDto extends OmitType(CreateTripDto, [] as const) {
  id: number;
}
