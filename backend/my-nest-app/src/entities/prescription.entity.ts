import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hospital } from "./hospital.entity";
import { Doctor } from "./doctor.entity";
import { PrescriptionMedicine } from "./prescription_medicine.entity";

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
    clinic_id: number;

    @Column({type: 'boolean', default: false})
    social_insurance: boolean;

    @ManyToOne(() => User, user => user.prescription, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'patient_is'})
    user: User;

    @ManyToOne(() => Hospital, hospital => hospital.prescription, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'hospital_id'})
    hospital: Hospital;

    @ManyToOne(() => Doctor, doctor => doctor.prescription, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'doctor_id'})
    doctor: Doctor;

    @OneToMany(() => PrescriptionMedicine, prescriptionMedicine => prescriptionMedicine.presciption, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',     
    })
    prescriptionMedicine: PrescriptionMedicine[];

    
}