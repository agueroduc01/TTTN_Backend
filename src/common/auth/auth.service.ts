import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getOneByEmail(email);
    if (user && user.password === password) {
      const { email, password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
