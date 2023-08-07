import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { UserEntity } from "../entities";
import { Repository } from "typeorm";
import { UsersDto } from "./dto/users.dto";
import { GetUserType } from "src/utils/types";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  hidePasswordToDTO(user: UserEntity): GetUserType {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      departmentId: user.departmentId,
      roleId: user.roleId,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }

  async getUsers(): Promise<GetUserType[]> {
    const data = await this.userRepository.find({
      relations: ["departmentId", "roleId"],
    });
    const users = data.map((user) => this.hidePasswordToDTO(user));
    return users;
  }

  async getOneById(id: number): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneByOrFail({ id }); // select * from User where user.id = id
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async getOneByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneByOrFail({ email: email }); // select * from User where user.id = id
      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto); // const newUser = new User()
    return this.userRepository.save(newUser); // Insert
  }

  detailUser(id: number) {
    // find in database the id input
    return this.userRepository.findOneBy({ id });
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    const user = await this.getOneById(id);
    return this.userRepository.save({ ...user, ...updateUserDto }); // UPDATE
  }

  async deleteUser(id: number): Promise<UserEntity> {
    const user = await this.getOneById(id);
    if (user) {
      return this.userRepository.remove(user);
    }
    return;
  }

  async customQuery(roleId: string, departmentId: number) {
    return await this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.roleId", "roleId")
      .leftJoinAndSelect("user.departmentId", "departmentId")
      .where("user.roleId = :roleId", { roleId })
      .andWhere("user.departmentId = :departmentId", { departmentId });
  }

  async loginUser(email: string, password: string) {
    const user = await this.getOneByEmail(email);
    return user;
  }

  async getManagerList() {
    return await this.userRepository.find({ where: { roleId: "R1" } });
  }
}
