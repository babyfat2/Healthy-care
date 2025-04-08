import { EROOM, ESPECIALTIES } from "src/global/globalEnum";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Hospital } from "./hospital.entity";
import { WorkCalender } from "./work_calender.entity";
import { Schedule } from "./schedule.entity";
import { Prescriptions } from "./prescription.entity";

@Entity("rooms")
export class Room {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256,  nullable: false})
    name_building: string;

    @Column({type: 'varchar', length: 256, nullable: false})
    room_number: string;

    @Column({type: 'int',  nullable:  false})
    hospital_id: number;

    @Column({type: 'enum', enum: EROOM, default: EROOM.CLINICAL})
    room_type: EROOM;

    @Column({type: 'enum', enum: ESPECIALTIES,  nullable: true})
    specialties: ESPECIALTIES;

    @ManyToOne(() => Hospital, hospital => hospital.clinic, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: "hospital_id"})
    hospital: Hospital;

    @OneToMany(() => WorkCalender, workCalender => workCalender.room, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    workCalender: WorkCalender[];

    @OneToMany(() => Schedule, schedule => schedule.room, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    schedule: Schedule[];

    @OneToMany(() => Prescriptions, prescriptions => prescriptions.room, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    prescriptions: Prescriptions[]

}