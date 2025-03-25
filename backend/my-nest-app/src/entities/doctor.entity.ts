import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(() => Doctor, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true
    })
    @JoinColumn({ name: "user_id" })
    doctor: Doctor;

}