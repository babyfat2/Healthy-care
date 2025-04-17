import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointments.entity";
import { User } from "./user.entity";
import { Prescriptions } from "./prescription.entity";

@Entity('patient')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 256 ,nullable: false,unique: true, default: 0 })
  citizen_identification_id: string;

  @Column({ type: "varchar", length: 256, nullable: false, default: 0})
  full_name: string;

  @Column({type: 'varchar', length: 256, nullable: false, default: 0})
  address: string;

  @Column({ type: "varchar", length: 512, nullable: true })
  hometown: string;

  @Column({type: 'date', nullable: true })
  birthday: Date;

  @Column({ type: "varchar", length: 256, nullable: true })
  ethnicity: string; // dân tộc

  @Column({ type: "date", nullable: true })
  issued_date: Date;

  @Column({ type: "varchar", length: 256, nullable: true })
  issued_place: string;

  @Column({ type: 'varchar', length: 256, nullable: false, default: 0 })
  phone: string;

  @Column({ type: 'int', nullable: false})
  user_id: number;


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
  user: User;
}
