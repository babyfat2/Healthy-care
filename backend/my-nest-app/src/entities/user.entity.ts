import { EROLE } from "src/global/globalEnum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RequestViewMedicalRecord } from "./request_view_medical_record.entity";
import { WorkCalender } from "./work_calender.entity";
import { StaffHospital } from "./staff_hospital.entity";
import { ClinicalDoctor } from "./clinical_doctor.entity";
import { ParaclinicalDoctor } from "./paraclinical_doctor.entity";
import { Receptionist } from "./receptionist.entity";
import { Patient } from "./patient.entity";

@Entity('users')
export class User {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 256,  unique: true })
    email: string;

    @Column({ type: "varchar", length: 256,})
    password: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    avatar: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    resetToken: string;

    @Column({ type: "varchar", length: 256, nullable: true })
    full_name: string;

    @Column({ type: 'enum', enum: EROLE, default: EROLE.PATIENT })
    role: EROLE;

    @Column({ type: 'int', nullable: true })
    patient_id: number;

    @OneToMany(() => RequestViewMedicalRecord, requestViewMedicalRecord => requestViewMedicalRecord.patient, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    requestViewMedicalRecordPatient: RequestViewMedicalRecord[];

    @OneToMany(() => RequestViewMedicalRecord, requestViewMedicalRecord => requestViewMedicalRecord.doctor, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    })
    requestViewMedicalRecordDoctor: RequestViewMedicalRecord[];

    @OneToMany(() => WorkCalender, workCalender => workCalender.staff, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    workCalender: WorkCalender[];

    @OneToMany(() => StaffHospital, staffHospital => staffHospital.staff, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    staffHospital: StaffHospital[];

    @OneToOne(() => ClinicalDoctor, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: "clinical_doctor_id"})
    clinical_doctor?: ClinicalDoctor;

    @OneToOne(() => ParaclinicalDoctor, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: "paraclinical_doctor_id"})
    paraclinical_doctor?: ParaclinicalDoctor;

    @OneToOne(() => Receptionist, {
        nullable: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: "receptionist_id"})
    receptionist?: Receptionist;

    @ManyToOne(() => Patient, patient => patient.user, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'patient_id'})
    patient: Patient;

}