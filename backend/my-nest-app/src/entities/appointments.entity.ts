import { ESTATUS, ESTATUSAPOINTMENT } from "src/global/globalEnum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hospital } from "./hospital.entity";
import { Patient } from "./patient.entity";
import { Schedule } from "./schedule.entity";
import { Prescriptions } from "./prescription.entity";

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

    @Column({type: 'date', nullable: false})
    appointment_time: Date;

    @Column({type: 'int', nullable: true})
    stt: number;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'varchar', length: 200, nullable: true})
    name: string; // số liên lạc với người bệnh

    @Column({type: 'varchar', length: 20, nullable: true})
    phone: string; // số liên lạc với người bệnh

    @Column({type: 'enum', enum: ESTATUSAPOINTMENT, default: ESTATUSAPOINTMENT.PENDING})
    status: ESTATUSAPOINTMENT;

    @Column({type: 'int', nullable: true})
    user_id: number;

    @ManyToOne(() => Patient, patient => patient.appointment,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'patient_id'})
    patient: Patient;

    @ManyToOne(() => User, user => user.appointment,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Hospital, hospital => hospital.appointment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'hospital_id'})
    hospital: Hospital;

    @OneToMany(() => Prescriptions, prescription => prescription.appointment)
    prescription: Prescriptions[];



    @OneToMany(() => Schedule, schedule => schedule.appointment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    schedule: Schedule[];

}