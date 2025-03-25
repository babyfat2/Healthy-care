import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointments.entity";
import { Room } from "./room.entity";

@Entity('schedule')
export class Schedule {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'datetime', nullable: false })
    statustart: Date;

    @Column({type: 'varchar', length: 256 ,nullable: true})
    patient_medical_record: string;

    @Column({type: 'int', nullable: true})
    fee: number;

    @Column({type: 'int', nullable: false})
    room_id: number;

    @Column({type: 'int', nullable: false})
    appointment_id: number;

    @ManyToOne(() => Appointment, appointment => appointment.schedule, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'appointment_id'})
    appointment: Appointment;

    @ManyToOne(() => Room, room => room.schedule, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({name: 'room_id'})
    room: Room;

}