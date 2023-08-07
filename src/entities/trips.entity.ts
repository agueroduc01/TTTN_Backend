import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Partners } from "./partners.entity";
import { Users } from "./users.entity";
import { Expense } from "./expenses.entity";
import { Assignments } from "./assignment.entity";
import { UserEntity } from ".";

@Entity("trips")
export class Trips {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Expense, (expense) => expense.tripId)
  @OneToMany(() => Assignments, (assignment) => assignment.tripId)
  id: number;

  @Column()
  @ManyToOne(() => Partners, (partner) => partner.id, { onUpdate: "CASCADE" })
  @JoinColumn({
    name: "partnerId",
    foreignKeyConstraintName: "FK_TRIP_PARTNER",
    referencedColumnName: "id",
  })
  partnerId: number;

  @Column({})
  destination: string;

  @Column()
  content: string;

  @Column({ type: "date" })
  departureDate: string;

  @Column({ type: "date" })
  returnDate: string;

  @Column({ type: "text", nullable: true })
  @ManyToOne(() => Users, (users) => users.id, { onUpdate: "CASCADE" })
  @JoinColumn({
    name: "managerId",
    foreignKeyConstraintName: "FK_TRIP_MANAGER",
    referencedColumnName: "id",
  }) // this decorator is optional for @ManyToOne, but required for @OneToOne
  managerId: UserEntity;

  constructor(trip: Partial<Trips>) {
    Object.assign(this, trip);
  }
}
