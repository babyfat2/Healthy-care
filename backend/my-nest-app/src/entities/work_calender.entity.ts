import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Room } from "./room.entity";

@Entity('work_calender')
export class WorkCalender {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date', nullable: false })
    work_time: string;

    @Column({type: 'datetime', nullable: false , default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column({type: 'datetime', nullable: true , onUpdate: 'CURRENT_TIMESTAMP'  })
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