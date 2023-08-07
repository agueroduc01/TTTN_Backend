import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("role")
export class Role {
  @PrimaryColumn()
  // @OneToMany(() => UserEntity, (user) => user.roleId)
  id: string;

  @Column()
  type: string;
}
