import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hospital } from "./hospital.entity";
import { User } from "./user.entity";

@Entity('staff_hospital')
export class StaffHospital {
    constructor() {

    };

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime', nullable: false })
    work_time: Date;

    @Column({ type: 'datetime', nullable: false })
    start_at: Date;

    @Column({ type: 'datetime', nullable: false })
    end_at: Date;

    @Column({ type: 'int', nullable: false })
    hospital_id: number;
    
    @Column({ type: 'int', nullable: false })
    staff_id: number;

    @ManyToOne(() => Hospital, hospital => hospital.staffHospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'hospital_id' })
    hospital: Hospital;

    @ManyToOne(() => User, user => user.staffHospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({ name: 'staff_id' })
    staff: Hospital;

}