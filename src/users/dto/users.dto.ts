import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/entities/role.entity";

export class UsersDto {
  @IsEmail({}, { message: "Must be a valid email address" })
  @IsNotEmpty()
  email: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  gender?: string;
  phoneNumber?: string;
  // password?: string;
  departmentId?: number;
  roleId?: string;
  created_at?: Date;
  updated_at?: Date;
  constructor(user: Partial<UsersDto>) {
    Object.assign(this, user);
  }
}
