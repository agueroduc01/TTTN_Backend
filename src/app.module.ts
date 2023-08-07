import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
// import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import {
  UserEntity,
  AssignmentsEntity,
  EvidencesEntity,
  PartnersEntity,
  ReportsEntity,
  RoleEntity,
  TripsEntity,
  DepartmentEntity,
  ExpenseEntity,
} from "./entities";
import { TripsModule } from "./trips/trips.module";
import { AuthModule } from "./common/auth/auth.module";
import { AssignmentModule } from "./assignment/assignment.module";
import { ReportModule } from "./report/report.module";
import { EvidenceModule } from "./evidence/evidence.module";
import { RoleModule } from "./role/role.module";
import { DepartmentModule } from "./department/department.module";
import { PartnerModule } from "./partner/partner.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./common/guards/roles.guard";
import { ExpenseModule } from "./expense/expense.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "123456",
      database: "tttn",
      entities: [
        UserEntity,
        RoleEntity,
        PartnersEntity,
        TripsEntity,
        AssignmentsEntity,
        ReportsEntity,
        EvidencesEntity,
        DepartmentEntity,
        ExpenseEntity,
      ],
      synchronize: false,
    }),
    UsersModule,
    TripsModule,
    AuthModule,
    AssignmentModule,
    ReportModule,
    EvidenceModule,
    RoleModule,
    DepartmentModule,
    PartnerModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_GUARD, useClass: RolesGuard }
  ],
})
// export class AppModule {
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("users");
  }
}
