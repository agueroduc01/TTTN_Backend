import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExpenseEntity } from "src/entities";

@Module({
  providers: [],
  controllers: [],
  imports: [TypeOrmModule.forFeature([ExpenseEntity])],
})
export class ExpenseModule {}
