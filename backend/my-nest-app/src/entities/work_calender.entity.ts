import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Room } from "./room.entity";

@Entity('work_calender')
export class WorkCalender {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'datetime', nullable: false })
    work_time: Date;

    @Column({type: 'datetime', nullable: false })
    created_at: Date;

    @Column({type: 'datetime', nullable: false })
    updated_at: Date;

    @Column({ type: 'int' , nullable: true})
    staff_id: number;

    @Column({ type: 'int' , nullable: true})
    room_id: number;

    @ManyToOne(() => User, user => user.workCalender, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'staff_id'})
    staff: User;

    @ManyToOne(() => Room, room => room.workCalender, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'room_id'})
    room: Room;
}