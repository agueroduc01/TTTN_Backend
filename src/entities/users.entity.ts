import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Assignments } from "./assignment.entity";
import { Role } from "./role.entity";
import { Department } from "./department.entity";
import {
  // Exclude,
  instanceToPlain,
} from "class-transformer";
import { Trips } from "./trips.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Assignments, (assignment) => assignment.employeeId)
  @OneToOne(() => Department, (department) => department.id)
  @OneToMany(() => Trips, (trip) => trip.managerId)
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column()
  @ManyToOne(() => Department, (department) => department.id, {
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "departmentId",
    foreignKeyConstraintName: "FK_EMPLOYEE_DEPARTMENT",
    referencedColumnName: "id",
  }) // this decorator is optional for @ManyToOne, but required for @OneToOne
  departmentId: number;

  @Column()
  // @Exclude({ toPlainOnly: true })
  password: string;

  @ManyToOne(() => Role, (role) => role.id, {
    onUpdate: "CASCADE",
  })
  @JoinColumn({
    name: "roleId",
    foreignKeyConstraintName: "FK_USER_ROLE",
    referencedColumnName: "id",
  })
  @Column()
  roleId: string;

  @CreateDateColumn({ default: null })
  created_at?: Date;

  @UpdateDateColumn({ default: null })
  updated_at?: Date;

  constructor(user: Partial<Users>) {
    Object.assign(this, user);
  }
  toJSON() {
    return instanceToPlain(this);
  }
}
