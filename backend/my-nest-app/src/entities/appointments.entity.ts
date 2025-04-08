import { ESTATUS } from "src/global/globalEnum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hospital } from "./hospital.entity";
import { Patient } from "./patient.entity";
import { Schedule } from "./schedule.entity";

@Entity('appointments') 
export class Appointment {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', nullable: false})
    patient_id: number;

    @Column({type: 'int', nullable: false})
    hospital_id: number;

    @Column({type: 'datetime', nullable: false})
    appointment_time: Date;

    @Column({type: 'enum', enum: ESTATUS, default: ESTATUS.PENDING})
    status: ESTATUS;

    @ManyToOne(() => Patient, patient => patient.appointment,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'patient_id'})
    patient: Patient;

    @ManyToOne(() => Hospital, hospital => hospital.appointment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    hospital: Hospital;


    @OneToMany(() => Schedule, schedule => schedule.appointment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    schedule: Schedule[];

}