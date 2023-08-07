import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reports } from "./reports.entity";

@Entity("evidences")
export class Evidences {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  type: string;

  @Column()
  description: string;

  @Column()
  @ManyToOne(() => Reports, (report) => report.id, { onUpdate: "CASCADE" })
  @JoinColumn({
    name: "reportId",
    foreignKeyConstraintName: "FK_EVIDENCE_REPORT",
    referencedColumnName: "id",
  })
  reportId: number;
}
