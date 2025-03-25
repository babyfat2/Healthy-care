import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointments.entity";
import { User } from "./user.entity";
import { Prescriptions } from "./prescription.entity";

@Entity('Patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 256 ,nullable: false,unique: true })
  citizen_identification_id: number;

  @Column({ type: "varchar", length: 256, nullable: false})
  full_name: string;

  @Column({type: 'varchar', length: 256, nullable: false})
  address: string;

  @Column({ type: 'varchar', length: 256, nullable: true })
  phone: string;


  @OneToMany(() => Appointment, appointment => appointment.patient, {
    onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  })
  appointment: Appointment[];

  @OneToMany(() => Prescriptions, prescriptions => prescriptions.patient, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  prescriptions: Prescriptions[];

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({name: "user_id"})
  user_id: User;
}
