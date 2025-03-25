import { EROLE } from "src/common/globalEnum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestViewMedicalRecord } from "./request_view_medical_record";
import { WorkCalender } from "./work_calender.entity";
import { StaffHospital } from "./staff_hospital.entity";

@Entity('users')
export class User {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    avatar: string;

    @Column({ nullable: true })
    resetToken: string;

    @Column({ type: 'enum', enum: EROLE, default: EROLE.PATIENT })
    role: EROLE;



    // @OneToMany(() => RequestViewMedicalRecord, requestViewMedicalRecord => requestViewMedicalRecord.patient, {
    //     onDelete: 'SET NULL',
    //     onUpdate: 'CASCADE'
    // })
    // requestViewMedicalRecordPatient: RequestViewMedicalRecord[];

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

}