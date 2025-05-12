import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrescriptionMedicine } from "./prescription_medicine.entity";

@Entity('dosage_schedule')
export class DosageSchedule {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', nullable: false })
    prescription_medicine_id: number;

    @Column({type: 'varchar', nullable: false})
    time: string;

    @Column({type: 'date', nullable: true})
    date: Date;


    @Column({type: 'boolean', default: false})
    is_taken: boolean;

    @ManyToOne(() => PrescriptionMedicine, prescriptionMedicine => prescriptionMedicine.dosageSchedules, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'prescription_medicine_id'})
    prescriptionMedicine: PrescriptionMedicine;
}