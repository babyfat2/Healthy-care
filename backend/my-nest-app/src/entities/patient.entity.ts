import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointments.entity";
import { User } from "./user.entity";
import { Prescriptions } from "./prescription.entity";

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 256 ,nullable: true,unique: true, default: null })
  citizen_identification_id: string;

  @Column({ type: "varchar", length: 256, nullable: true, default: null})
  full_name: string;

  @Column({type: 'varchar', length: 256, nullable: true, default: null})
  address: string;

  @Column({ type: "varchar", length: 512, nullable: true , default: null})
  hometown: string;

  @Column({type: 'date', nullable: true, default: null })
  birthday: Date;

  @Column({ type: "varchar", length: 256, nullable: true , default: null})
  ethnicity: string; // dân tộc

  @Column({ type: "date", nullable: true , default: null})
  issued_date: Date;

  @Column({ type: "varchar", length: 256, nullable: true , default: null})
  issued_place: string;

  @Column({ type: 'varchar', length: 256, nullable: true, default: null })
  phone: string;

  @Column({ type: "varchar", length: 10, nullable: true })
  gender: string;

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

  @OneToMany(() => User, user => user.patient ,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  user: User[];
}
