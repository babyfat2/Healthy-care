import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('receptionist')
export class Receptionist {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 256, nullable: true })
    full_name: string;

    @Column({ type: 'varchar', length: 256, nullable: true })
    phone: number;
}