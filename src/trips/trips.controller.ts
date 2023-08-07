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
import { TripsService } from "./trips.service";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Controller("api/v1/trips")
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async getTrips(@Query("sortDesc", ParseBoolPipe) sortDesc: boolean) {
    try {
      const data = await this.tripsService.findAll();
      const trips = data.map((trip) => {
        delete trip.managerId.password;
        return trip;
      });
      if (sortDesc && sortDesc === true) {
        trips.reverse();
      }
      return trips;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Post("create-trip")
  async createTrip(@Body() createTripDto: CreateTripDto) {
    try {
      const data = await this.tripsService.create(createTripDto);
      return data;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Get("/:id")
  async detailTrip(@Param("id") id: number) {
    try {
      const data = await this.tripsService.detailTrip(id);
      return data;
    } catch (error) {
      console.log(error);
      return { message: error.message };
    }
  }

  @Put("/:id")
  async updateTrip(
    @Param("id") id: number,
    @Body() updateTripDto: UpdateTripDto
  ) {
    try {
      const data = await this.tripsService.updateTrip(+id, updateTripDto);
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
  async deleteTrip(@Param("id") id: number) {
    try {
      const trip = await this.tripsService.deleteTrip(id);
      return trip;
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

  @Get("/:id/assignments")
  async getAssignments(@Param("id") idTrip: number) {
    console.log(idTrip);
    try {
      const data = await this.tripsService.getAssignmentsInTrip(idTrip);
      const assignments = data.map((assignment) => {
        delete assignment.employeeId.password;
        delete assignment.tripId.managerId.password;
        return assignment;
      });
      return assignments;
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
