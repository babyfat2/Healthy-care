import { EROLE } from "src/common/globalEnum";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entity";
import { Prescriptions } from "./prescription.entity";
import { Hospital } from "./hospital.entity";
import { Appointment } from "./appointments.entity";

@Entity('users')
export class User {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, unique: true, })
    email: string;

    @Column({type: 'varchar', length: 11, nullable: true,})
    phone: string;

    @Column({type: "varchar", length: 256, nullable: false})
    password: string;

    @Column({type: 'varchar', length: 256, nullable: true})
    full_name: string;

    @Column({type: 'varchar', length: 256, nullable: true})
    address: string;

    @Column({type: 'varchar', length: 256, nullable: true})
    reset_token: string;

    @Column({type: 'enum', enum: EROLE, default: EROLE.PATIENT })
    role: EROLE;

    @OneToOne(() => Doctor, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true
    })
    @JoinColumn({name: "doctor_id"})
    doctor: Doctor;

    @OneToOne(() => Hospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true
    })
    @JoinColumn({name: "hospital_id"})
    hospital: Hospital;

    @OneToMany(() => Prescriptions, precription => precription.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    prescription: Prescriptions[];

    @OneToMany(() =>  Appointment, appointment => appointment.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    appointment: Appointment[];

}