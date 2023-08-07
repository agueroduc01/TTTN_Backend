import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  SetMetadata,
} from "@nestjs/common";
import { PartnerService } from "./partner.service";
import { Roles } from "src/common/guards/roles.decorator";

@Controller("partners")
export class PartnersController {
  constructor(private partnerService: PartnerService) {}

  @Get()
  async getPartners() {
    try {
      const data = await this.partnerService.getAll();
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("/:id")
  // @SetMetadata("roles", ["admin"])
  // @Roles("admin")
  async detailPartner(
    @Param(
      "id",
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ) {
    try {
      const data = await this.partnerService.getOneById(id);
      return data;
    } catch (error) {
      // throw new ForbiddenException("Test forbidden exception");
      throw new BadRequestException("Test Bad Request exception");
    }
  }
}
