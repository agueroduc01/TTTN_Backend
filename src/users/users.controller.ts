import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  UseGuards,
  HttpException,
  Request,
  ParseIntPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersDto } from "src/users/dto/users.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { AuthGuard } from "src/common/auth/auth.controller";
import { LocalAuthGuard } from "src/common/auth/local-auth.guard";

@Controller("api/v1/users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  // @UseGuards(AuthGuard)
  async getUsers(): // @Res({ passthrough: true }) res: Response
  Promise<UsersDto[]> {
    try {
      const data = await this.usersService.getUsers();
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

  @Post("/create-user")
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.usersService.createUser(createUserDto);
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

  @Get("/detail/:id")
  async detailUser(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    const user = await this.usersService.detailUser(id);
    if (user) {
      return user;
    }
    throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
  }

  @Put("/:id")
  async updateUser(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const data = await this.usersService.updateUser(+id, updateUserDto);
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
  async deleteUser(@Param("id") id: number) {
    try {
      const user = await this.usersService.deleteUser(id);
      if (user) {
        return user;
      }
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

  // @UseGuards(LocalAuthGuard)
  @Post("login")
  // login(@Request() req) {
  //   return req.user;
  // }
  async login(@Body() dataInput: any) {
    try {
      const data = await this.usersService.loginUser(
        dataInput.email,
        dataInput.password
      );
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

  @Get("/managerList")
  async getManagerList() {
    try {
      const data = await this.usersService.getManagerList();
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
}
