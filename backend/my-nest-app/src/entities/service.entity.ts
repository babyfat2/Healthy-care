import { ESPECIALTIES } from "src/global/globalEnum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("service")
export class Service {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256,  nullable: false})
    name_service: string;

    @Column({type: 'int', nullable: false})
    price_service: number;

    @Column({type: 'enum', enum: ESPECIALTIES,  nullable: true})
    specialties: ESPECIALTIES;

}