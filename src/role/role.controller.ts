import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  async getRoles() {
    try {
      const data = await this.roleService.getAll();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
