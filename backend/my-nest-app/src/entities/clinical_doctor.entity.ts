import { ECLINICAL } from "src/global/globalEnum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clinical_doctors')
export class ClinicalDoctor {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {type: 'enum', enum: ECLINICAL, default: ECLINICAL.GENERAL_INTERNAL_MEDICINE })
    clinical_specialties: ECLINICAL;

    // số năm kinh nghiệm
    @Column({type: 'int', nullable: true})
    experience_year: number;

    // mã số chứng chỉ hành nghề
    @Column({type: 'varchar', length: 245, nullable: true})
    license_number: string;

    // giới thiệu bản thân của bác sĩ
    @Column({type: 'varchar', length: 245, nullable: true})
    bio: string;


}