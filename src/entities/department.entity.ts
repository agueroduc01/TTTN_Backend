import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Entity("department")
export class Department {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Users, (user) => user.departmentId)
  id: number;

  @OneToOne(() => Users, (user) => user.id, { onUpdate: "CASCADE" })
  @JoinColumn({
    name: "managerId",
    foreignKeyConstraintName: "FK_DEPARTMENT_MANAGER",
    referencedColumnName: "id",
  })
  managerId: number;

  @Column({ unique: true })
  name: string;
}
