import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hospital } from "./hospital.entity";
import { PrescriptionMedicine } from "./prescription_medicine.entity";
import { Room } from "./room.entity";
import { Patient } from "./patient.entity";

@Entity('prescriptions')
export class Prescriptions {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    doctor_id: number;

    @Column({type: 'int'})
    hospital_id: number;

    @Column({type: 'int'})
    patient_id: number;

    @Column({type: 'int'})
    room_id: number;

    @Column({type: 'boolean', default: false})
    social_insurance: boolean;

    @ManyToOne(() => Patient, patient => patient.prescriptions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'patient_id'})
    patient: Patient;

    @ManyToOne(() => Hospital, hospital => hospital.prescriptions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'hospital_id'})
    hospital: Hospital;

    @ManyToOne(() => Room, room => room.prescriptions, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'room_id' })
    room: Room;

    @OneToMany(() => PrescriptionMedicine, prescriptionMedicine => prescriptionMedicine.presciption, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',     
    })
    prescriptionMedicine: PrescriptionMedicine[];

    
}