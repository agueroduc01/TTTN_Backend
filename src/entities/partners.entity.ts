import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Trips } from "./trips.entity";

@Entity("partners")
export class Partners {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Trips, (trip) => trip.partnerId)
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  contactPerson: string;
}
