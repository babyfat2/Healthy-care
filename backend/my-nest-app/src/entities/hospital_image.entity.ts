import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./appointments.entity";
import { Room } from "./room.entity";
import { Prescriptions } from "./prescription.entity";
import { StaffHospital } from "./staff_hospital.entity";
import { Hospital } from "./hospital.entity";

@Entity('hospital_image')
export class HospitalImage {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, nullable: false})
    image_uri: string;

    @Column({type: 'int', nullable: false})
    stt_image: number;

    @Column({type: 'int', nullable: false})
    hospital_id: number;

    @ManyToOne(() => Hospital, hospital => hospital.hospitalImage)
    @JoinColumn({
        name: "hospital_id"
    })
    hospital: Hospital; 
}