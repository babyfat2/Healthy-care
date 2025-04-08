import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('request_view_medical_record')
export class RequestViewMedicalRecord {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'datetime', nullable: false })
    verify_token: Date;

    @Column({ type: 'int' , nullable: true})
    patient_id: number;

    @Column({ type: 'int' , nullable: true})
    doctor_id: number;

    @ManyToOne(() => User, user => user.requestViewMedicalRecordPatient, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'})
    @JoinColumn({name: 'patient_id'})
    patient: User;

    @ManyToOne(() => User, user => user.requestViewMedicalRecordDoctor, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'doctor_id'})
    doctor: User;
 
}