import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";
import { Trips } from "./trips.entity";
import { Reports } from "./reports.entity";
import { TripsEntity, UserEntity } from ".";

@Entity("assignments")
export class Assignments {
  @PrimaryGeneratedColumn()
  @OneToOne(() => Reports, (report) => report.id)
  id: number;

  @Column({ unique: true })
  task: string;

  @Column({ nullable: true })
  expectedResult: string;

  @Column({ type: "text", nullable: true })
  @ManyToOne(() => Users, (users) => users.id, { onUpdate: "CASCADE" })
  @JoinColumn({
    name: "employeeId",
    foreignKeyConstraintName: "FK_ASSIGNMENT_EMPLOYEE",
    referencedColumnName: "id",
  })
  employeeId: UserEntity;

  @Column({ type: "text", nullable: true })
  @ManyToOne(() => Trips, (trip) => trip.id, { onUpdate: "CASCADE" })
  @JoinColumn({
    name: "tripId",
    foreignKeyConstraintName: "FK_ASSIGNMENT_TRIP",
    referencedColumnName: "id",
  })
  tripId: TripsEntity;
}
