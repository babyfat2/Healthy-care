import { MigrationInterface, QueryRunner } from "typeorm";

export class Initdatabase1742917091103 implements MigrationInterface {
    name = 'Initdatabase1742917091103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP FOREIGN KEY \`FK_01f41c4435b1e13060e05fdd557\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6da026cf705d995e70c1b1c106b\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_2d6a1941bd705056030c2b9e07d\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_445a188ea85a1dba47dc19900e5\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_01733651151c8a1d6d980135cc4\``);
        await queryRunner.query(`DROP INDEX \`REL_6da026cf705d995e70c1b1c106\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`staff_hospital\` (\`id\` int NOT NULL AUTO_INCREMENT, \`work_time\` datetime NOT NULL, \`start_at\` datetime NOT NULL, \`end_at\` datetime NOT NULL, \`hospital_id\` int NOT NULL, \`staff_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`work_calender\` (\`id\` int NOT NULL AUTO_INCREMENT, \`work_time\` datetime NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`staff_id\` int NULL, \`room_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`citizen_identification_id\` varchar(256) NOT NULL, \`full_name\` varchar(256) NOT NULL, \`address\` varchar(256) NOT NULL, \`phone\` varchar(256) NULL, \`user_id\` int NULL, UNIQUE INDEX \`IDX_85ba47bfa4b2cceec2b4e886c9\` (\`citizen_identification_id\`), UNIQUE INDEX \`REL_df2965e48049440d8fb88ce993\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rooms\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(256) NOT NULL, \`room_number\` varchar(256) NOT NULL, \`hospital_id\` int NOT NULL, \`specialties\` enum ('NOI KHOA') NOT NULL DEFAULT 'NOI KHOA', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`statustart\` datetime NOT NULL, \`patient_medical_record\` varchar(256) NULL, \`fee\` int NULL, \`room_id\` int NOT NULL, \`appointment_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`receptionist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`full_name\` varchar(256) NULL, \`phone\` varchar(256) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prescription_disease\` (\`id\` int NOT NULL AUTO_INCREMENT, \`prescription_id\` int NOT NULL, \`disease_id\` int NOT NULL, \`description\` varchar(256) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`clinic_id\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP COLUMN \`clinicId\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`full_name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`address\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`hospital_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`reset_token\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP COLUMN \`clinic_id\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP COLUMN \`patient_is\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP COLUMN \`pateint_id\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`resetToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD \`room_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD \`patient_id\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('patient', 'DOCTOR', 'HOSPITAL') NOT NULL DEFAULT 'patient'`);
        await queryRunner.query(`ALTER TABLE \`staff_hospital\` ADD CONSTRAINT \`FK_e1a9e7a1a2253de249200daf24e\` FOREIGN KEY (\`hospital_id\`) REFERENCES \`hospital\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`staff_hospital\` ADD CONSTRAINT \`FK_b175dd501f07482741b2dca470c\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`work_calender\` ADD CONSTRAINT \`FK_f65aa2b0e7566e28197cb8bcbf4\` FOREIGN KEY (\`staff_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`work_calender\` ADD CONSTRAINT \`FK_b51aaefc38362663ca2720d206f\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`Patient\` ADD CONSTRAINT \`FK_df2965e48049440d8fb88ce9939\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_9389db557647131856661f7d7b5\` FOREIGN KEY (\`patient_id\`) REFERENCES \`Patient\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_3ddd7f62fc2f87390d46e0fee56\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD CONSTRAINT \`FK_5fd7d323f457d79f156562a5198\` FOREIGN KEY (\`hospital_id\`) REFERENCES \`hospital\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_3330f054416745deaa2cc130700\` FOREIGN KEY (\`patient_id\`) REFERENCES \`Patient\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_dc7783aba1649fa37e4ce869de5\` FOREIGN KEY (\`appointment_id\`) REFERENCES \`appointments\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_017c44638c80d285dd42221f460\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_017c44638c80d285dd42221f460\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_dc7783aba1649fa37e4ce869de5\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_3330f054416745deaa2cc130700\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP FOREIGN KEY \`FK_5fd7d323f457d79f156562a5198\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_3ddd7f62fc2f87390d46e0fee56\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_9389db557647131856661f7d7b5\``);
        await queryRunner.query(`ALTER TABLE \`Patient\` DROP FOREIGN KEY \`FK_df2965e48049440d8fb88ce9939\``);
        await queryRunner.query(`ALTER TABLE \`work_calender\` DROP FOREIGN KEY \`FK_b51aaefc38362663ca2720d206f\``);
        await queryRunner.query(`ALTER TABLE \`work_calender\` DROP FOREIGN KEY \`FK_f65aa2b0e7566e28197cb8bcbf4\``);
        await queryRunner.query(`ALTER TABLE \`staff_hospital\` DROP FOREIGN KEY \`FK_b175dd501f07482741b2dca470c\``);
        await queryRunner.query(`ALTER TABLE \`staff_hospital\` DROP FOREIGN KEY \`FK_e1a9e7a1a2253de249200daf24e\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`role\` \`role\` enum ('PATEINT', 'DOCTOR', 'HOSPITAL') NOT NULL DEFAULT 'PATEINT'`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(256) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP COLUMN \`patient_id\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP COLUMN \`room_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`resetToken\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD \`pateint_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD \`patient_is\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD \`clinic_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`reset_token\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`hospital_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`address\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`full_name\` varchar(256) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(11) NULL`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`clinicId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD \`clinic_id\` int NOT NULL`);
        await queryRunner.query(`DROP TABLE \`prescription_disease\``);
        await queryRunner.query(`DROP TABLE \`receptionist\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
        await queryRunner.query(`DROP TABLE \`rooms\``);
        await queryRunner.query(`DROP INDEX \`REL_df2965e48049440d8fb88ce993\` ON \`Patient\``);
        await queryRunner.query(`DROP INDEX \`IDX_85ba47bfa4b2cceec2b4e886c9\` ON \`Patient\``);
        await queryRunner.query(`DROP TABLE \`Patient\``);
        await queryRunner.query(`DROP TABLE \`work_calender\``);
        await queryRunner.query(`DROP TABLE \`staff_hospital\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_6da026cf705d995e70c1b1c106\` ON \`users\` (\`hospital_id\`)`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_01733651151c8a1d6d980135cc4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_445a188ea85a1dba47dc19900e5\` FOREIGN KEY (\`patient_is\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_2d6a1941bd705056030c2b9e07d\` FOREIGN KEY (\`doctor_id\`) REFERENCES \`doctors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6da026cf705d995e70c1b1c106b\` FOREIGN KEY (\`hospital_id\`) REFERENCES \`hospital\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD CONSTRAINT \`FK_01f41c4435b1e13060e05fdd557\` FOREIGN KEY (\`clinicId\`) REFERENCES \`clinic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
