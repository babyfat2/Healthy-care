import { ESTATUS } from "src/common/globalEnum";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Hospital } from "./hospital.entity";

@Entity('appointments') 
export class Appointment {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', nullable: false})
    pateint_id: number;

    @Column({type: 'int', nullable: false})
    hospital_id: number;

    @Column({type: 'datetime', nullable: false})
    appointment_time: Date;

    @Column({type: 'enum', enum: ESTATUS, default: ESTATUS.PENDING})
    status: ESTATUS;

    @ManyToOne(() => User, user => user.appointment,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    user: User;

    @ManyToOne(() => Hospital, hospital => hospital.appointment, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    hospital: Hospital;


}