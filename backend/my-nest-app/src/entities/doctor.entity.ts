import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Clinic } from "./clinic.entity";
import { Prescriptions } from "./prescription.entity";

@Entity('doctors')
export class Doctor {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, nullable: true})
    specialization: string;

    @Column({type: 'int', nullable: true})
    experience_year: number;

    @Column({type: 'varchar', length: 245, nullable: true})
    license_number: string;

    @Column({type: 'int', nullable: false})
    clinic_id: number;

    @ManyToOne(() => Clinic, clinic => clinic.doctor, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    clinic: Clinic;

    @OneToMany(() => Prescriptions, prescription => prescription.doctor,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    prescription: Prescriptions[];

}