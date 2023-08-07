import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Assignments } from "./assignment.entity";

@Entity("reports")
export class Reports {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => Assignments, (assignment) => assignment.id, {
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "assignmentId",
    foreignKeyConstraintName: "FK_REPORT_ASSIGNMENT",
    referencedColumnName: "id",
  })
  assignmentId: number;

  @Column()
  content: string;

  @Column({ type: "date" })
  reportDate: string;
}
