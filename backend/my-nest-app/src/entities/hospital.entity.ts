import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointments.entity";
import { Room } from "./room.entity";
import { Prescriptions } from "./prescription.entity";
import { StaffHospital } from "./staff_hospital.entity";
import { User } from "./user.entity";
import { Medicine } from "./medicine.entity";

@Entity('hospital')
export class Hospital {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, nullable: true})
    name: string;

    @Column({type: 'varchar', length: 256, nullable: false})
    address: string;

    @Column({type: "varchar", length: 11, nullable: false})
    phone: string;

    @Column({type: 'varchar', length: 256, nullable: false})
    email: string;

    @Column('double') // hoặc float
    latitude: number;
  
    @Column('double')
    longitude: number;

    @Column({type: 'int'})
    user_id: number;
    

    @OneToMany(() => Appointment, appointment =>  appointment.hospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    appointment: Appointment[];

    @OneToMany(() => Room, room => room.hospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    clinic: Room[];

    @OneToMany(() => Prescriptions, prescription => prescription.hospital, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    prescriptions: Prescriptions[];

    @OneToMany(() => StaffHospital, staffHospital => staffHospital.hospital, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE',
    })
    staffHospital: StaffHospital[];


    @OneToOne(() => User, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({name: "user_id"})
    user: User;

}