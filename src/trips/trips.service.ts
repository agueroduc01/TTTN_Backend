import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AssignmentsEntity, TripsEntity } from "src/entities";
import { EntityManager, Repository } from "typeorm";
import { CreateTripDto } from "./dto/create-trip.dto";
import { UpdateTripDto } from "./dto/update-trip.dto";

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(TripsEntity)
    private readonly tripRepository: Repository<TripsEntity>,
    @InjectRepository(AssignmentsEntity)
    private readonly assignmentsRepository: Repository<AssignmentsEntity>,
    private readonly entityManager: EntityManager
  ) {}

  async findAll() {
    return this.tripRepository.find({
      relations: ["managerId", "partnerId"],
    });
  }

  create(createTripDto: CreateTripDto) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!createTripDto) {
          resolve({
            errCode: 1,
            errMessage: "Missing required parameters!",
          });
        } else {
          const trip = new TripsEntity(createTripDto);
          const result = await this.entityManager.save(trip);
          if (result) {
            resolve(result);
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  async getOneById(id: number): Promise<TripsEntity> {
    try {
      const trip = await this.tripRepository.findOneByOrFail({ id }); // select * from Trips where user.id = id
      return trip;
    } catch (error) {
      throw error;
    }
  }

  async detailTrip(id: number) {
    try {
      const data = await this.tripRepository.findOne({
        relations: ["managerId", "partnerId"],
        where: { id },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateTrip(id: number, updateTripDto: UpdateTripDto) {
    const trip = await this.getOneById(id);
    return this.tripRepository.save({ ...trip, ...updateTripDto }); // UPDATE
  }

  async deleteTrip(id: number) {
    const trip = await this.getOneById(id);
    return this.tripRepository.remove(trip);
  }

  async getAssignmentsInTrip(tripId: number) {
    const trip = await this.getOneById(tripId);
    if (trip) {
      return (
        this.assignmentsRepository
          .createQueryBuilder("assignments")
          .leftJoinAndSelect("assignments.tripId", "tripId")
          .leftJoinAndSelect("assignments.employeeId", "employeeId")
          .where("assignments.tripId = :tripId", { tripId })
          .leftJoinAndSelect("tripId.managerId", "managerId")
          // .getManyAndCount();
          .getMany()
      );
    }
  }
}
