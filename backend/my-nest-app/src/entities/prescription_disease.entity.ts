import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('prescription_disease')
export class PrescriptionDisease {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int'})
    prescription_id: number;

    @Column({type: 'int'})
    disease_id: number;
  
    @Column({type: 'varchar', length: 256, nullable: true})
    description: string;
}
