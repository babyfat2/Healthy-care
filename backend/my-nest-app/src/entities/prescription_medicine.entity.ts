import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Prescriptions } from "./prescription.entity";
import { Medicine } from "./medicine.entity";
import { DosageSchedule } from "./dosage_schedule.entity";

@Entity('prescription_medicine')
export class PrescriptionMedicine {
    constructor() {

    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    ammount: number;

    @Column({type: 'date', nullable: false})
    start_time: Date;

    @Column({type: 'date', nullable: false})
    end_time: Date;

    @Column({type: 'int'})
    medicine_id: number;

    @Column({type: 'int'})
    prescription_id: number;

    @ManyToOne(() => Prescriptions, presciption => presciption.prescriptionMedicine, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'prescription_id'})
    presciption: Prescriptions;

    @ManyToOne(() => Medicine, medicine =>  medicine.prescriptionMedicine, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    @JoinColumn({name: 'medicine_id'})
    medicine: Medicine;

    @OneToMany(() => DosageSchedule, dosageSchedule => dosageSchedule.prescriptionMedicine,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    dosageSchedules: DosageSchedule[];
}