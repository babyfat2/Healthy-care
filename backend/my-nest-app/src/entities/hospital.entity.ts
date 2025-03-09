import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointments.entity";
import { Clinic } from "./clinic.entity";
import { Prescriptions } from "./prescription.entity";

@Entity('hospital')
export class Hospital {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, nullable: true})
    name: string;

    @Column({type: 'varchar', length: 256, nullable: false})
    address: string;

    @Column({type: "varchar", length: 11, nullable: false})
    phone: string;

    @Column({type: 'varchar', length: 256, nullable: false})
    email: string;

    @OneToMany(() => Appointment, appointment =>  appointment.hospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    appointment: Appointment[];

    @OneToMany(() => Clinic, clinic => clinic.hospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    clinic: Clinic[];

    @OneToMany(() => Prescriptions, prescription => prescription.hospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    prescription: Prescriptions[];

}