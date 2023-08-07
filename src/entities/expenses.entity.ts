import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Check,
} from "typeorm";
import { Trips } from "./trips.entity";

@Entity("expense")
@Check('"amount" > 0 && "amount" < 3000000', "amount_constraint")
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  expenseType: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  @ManyToOne(() => Trips, (trip) => trip.id, {
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "tripId",
    foreignKeyConstraintName: "FK_EXPENSE_TRIP",
    referencedColumnName: "id",
  })
  tripId: number;
}
