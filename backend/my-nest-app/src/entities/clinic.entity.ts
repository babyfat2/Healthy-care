import { ESPECIALTIES } from "src/common/globalEnum";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Doctor } from "./doctor.entity";
import { Hospital } from "./hospital.entity";

@Entity("clinic")
export class Clinic {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 256, nullable: false})
    room_number: string;

    @Column({type: 'int',  nullable:  false})
    hospital_id: number;

    @Column({type: 'enum', enum: ESPECIALTIES, default: ESPECIALTIES.NOI})
    specialties: ESPECIALTIES;

    @OneToMany(() => Doctor, doctor => doctor.clinic, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    doctor: Doctor;

    @ManyToOne(() => Hospital, hospital => hospital.clinic, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: "hospital_id"})
    hospital: Hospital;

}