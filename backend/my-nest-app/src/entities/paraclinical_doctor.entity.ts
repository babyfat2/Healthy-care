import { EPARACLINICAL, ESPECIALTIES } from "src/global/globalEnum";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('paraclinical_doctors')
export class ParaclinicalDoctor {
    constructor() {

    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {type: 'enum', enum: EPARACLINICAL, default: EPARACLINICAL.BIOCHEMISTRY })
    paraclinical_specialties: EPARACLINICAL;

    // số năm kinh nghiệm
    @Column({type: 'int', nullable: true})
    experience_year: number;

    // mã số chứng chỉ hành nghề
    @Column({type: 'varchar', length: 245, nullable: true})
    license_number: string;


}