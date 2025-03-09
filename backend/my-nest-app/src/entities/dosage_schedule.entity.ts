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

    @Column({type: 'time', nullable: false})
    time: Date;

    @ManyToOne(() => PrescriptionMedicine, prescriptionMedicine => prescriptionMedicine.dosageSchedules, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'prescription_medicine_id'})
    prescriptionMedicine: PrescriptionMedicine;
}