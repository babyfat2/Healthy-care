import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hospital } from "./hospital.entity";
import { PrescriptionMedicine } from "./prescription_medicine.entity";
import { Room } from "./room.entity";
import { Patient } from "./patient.entity";
import { Appointment } from "./appointments.entity";

@Entity('prescriptions')
export class Prescriptions {
    constructor() {

    }

    @PrimaryColumn()
    id: string;
  
    @BeforeInsert()
    generateId() {
        const id: string = Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
      this.id = id; // mặc định tạo chuỗi dài 21 ký tự, có thể rút ngắn nếu cần
    }
    @Column({type: 'int'})
    doctor_id: number;

    @Column({type: 'int'})
    hospital_id: number;

    @Column({type: 'int'})
    patient_id: number;

    @Column({type: 'int',  nullable: true})
    appointment_id: number;


    @Column({type: 'varchar', length: 500})
    diagnosis: string;

    @Column({type: 'boolean', default: false})
    is_first: boolean;

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

    @ManyToOne(() => Appointment, appointment => appointment.prescription)
    @JoinColumn({name: 'appointment_id'})
    appointment: Appointment;


    @OneToMany(() => PrescriptionMedicine, prescriptionMedicine => prescriptionMedicine.presciption, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',     
    })
    prescriptionMedicine: PrescriptionMedicine[];

    
}