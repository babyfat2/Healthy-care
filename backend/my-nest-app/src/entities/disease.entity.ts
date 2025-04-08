import { ESPECIALTIES } from "src/global/globalEnum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('disease')
export class Disease {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 256, nullable: false})
    name: string;

    @Column({type: 'varchar', length: 256, nullable: false})
    description: string;

    @Column({type: 'varchar', length: 256, nullable: true})
    symptoms: string;

    @Column({type: 'varchar', length: 256, nullable: true})
    treatment: string;

    @Column({type: 'enum', enum: ESPECIALTIES, default: ESPECIALTIES.BIOCHEMISTRY})
    specialties: ESPECIALTIES;

    @Column({type: 'boolean', default: false})
    is_contagious: boolean;

}