import { IsEmail, IsInt, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "Must be a valid email address" })
  email: string;
  @IsNotEmpty()
  password: string;
  firstName: string;
  lastName: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  departmentId: number;
  @IsNotEmpty()
  roleId: string;
}
