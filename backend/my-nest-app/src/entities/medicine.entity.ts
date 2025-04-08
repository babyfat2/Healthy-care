import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { PrescriptionMedicine } from "./prescription_medicine.entity";
import { Hospital } from "./hospital.entity";

@Entity('medicines')
export class Medicine {
    constructor() {

    }

    @PrimaryColumn()
    id: number;

    @Column({type: 'varchar', length: 256})
    name: string;

    @Column({type: 'varchar', length: 256})
    code: string;

    @Column({type: 'varchar', length: 256})
    origin: string;

    @Column({type: 'varchar', length: 256, nullable: true})
    description: string;

    @Column({type: 'int'})
    price: number;

    @Column({type: 'int'})
    stock_quantity: number;

    @OneToMany(() => PrescriptionMedicine, prescriptionMedicine => prescriptionMedicine.medicine, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    prescriptionMedicine: PrescriptionMedicine[];

}