import { MigrationInterface, QueryRunner } from "typeorm";

export class Aaa1741148310245 implements MigrationInterface {
    name = 'Aaa1741148310245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`appointments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`patient_id\` int NOT NULL, \`hospital_id\` int NOT NULL, \`appointment_time\` datetime NOT NULL, \`status\` enum ('PENDING', 'COMFIRMED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING', \`userId\` int NULL, \`hospitalId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medicines\` (\`id\` int NOT NULL, \`name\` varchar(256) NOT NULL, \`code\` varchar(256) NOT NULL, \`origin\` varchar(256) NOT NULL, \`description\` varchar(256) NULL, \`price\` int NOT NULL, \`stock_quantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dosage_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`prescription_medicine_id\` int NOT NULL, \`time\` time NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prescription_medicine\` (\`id\` int NOT NULL AUTO_INCREMENT, \`ammount\` int NOT NULL, \`start_time\` date NOT NULL, \`end_time\` date NOT NULL, \`medicine_id\` int NOT NULL, \`prescription_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prescriptions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`doctor_id\` int NOT NULL, \`hospital_id\` int NOT NULL, \`patient_id\` int NOT NULL, \`clinic_id\` int NOT NULL, \`social_insurance\` tinyint NOT NULL DEFAULT 0, \`patient_is\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hospital\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(256) NULL, \`address\` varchar(256) NOT NULL, \`phone\` varchar(11) NOT NULL, \`email\` varchar(256) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clinic\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(256) NOT NULL, \`room_number\` varchar(256) NOT NULL, \`hospital_id\` int NOT NULL, \`specialties\` enum ('NOI KHOA') NOT NULL DEFAULT 'NOI KHOA', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`doctors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`specialization\` varchar(256) NULL, \`experience_year\` int NULL, \`license_number\` varchar(245) NULL, \`clinic_id\` int NOT NULL, \`clinicId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(256) NOT NULL, \`phone\` varchar(11) NULL, \`password\` varchar(256) NOT NULL, \`full_name\` varchar(256) NULL, \`address\` varchar(256) NULL, \`role\` enum ('patient', 'DOCTOR', 'HOSPITAL') NOT NULL DEFAULT 'patient', \`doctor_id\` int NULL, \`hospital_id\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_6ea478e0c37ff2f69e32cfb94c\` (\`doctor_id\`), UNIQUE INDEX \`REL_6da026cf705d995e70c1b1c106\` (\`hospital_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`disease\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(256) NOT NULL, \`description\` varchar(256) NOT NULL, \`symptoms\` varchar(256) NULL, \`treatment\` varchar(256) NULL, \`specialties\` enum ('NOI KHOA') NOT NULL DEFAULT 'NOI KHOA', \`is_contagious\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_01733651151c8a1d6d980135cc4\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_36cc65c41268c0483eb22556e29\` FOREIGN KEY (\`hospitalId\`) REFERENCES \`hospital\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`dosage_schedule\` ADD CONSTRAINT \`FK_d74ed3a675829865322adbdc9ce\` FOREIGN KEY (\`prescription_medicine_id\`) REFERENCES \`prescription_medicine\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescription_medicine\` ADD CONSTRAINT \`FK_3d5495fd9b8ecbee8074dc50b95\` FOREIGN KEY (\`prescription_id\`) REFERENCES \`prescriptions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescription_medicine\` ADD CONSTRAINT \`FK_a4665acebe251147a0b8267567a\` FOREIGN KEY (\`medicine_id\`) REFERENCES \`medicines\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_445a188ea85a1dba47dc19900e5\` FOREIGN KEY (\`patient_is\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_940bd0b46d069bfecf93300ee5c\` FOREIGN KEY (\`hospital_id\`) REFERENCES \`hospital\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` ADD CONSTRAINT \`FK_2d6a1941bd705056030c2b9e07d\` FOREIGN KEY (\`doctor_id\`) REFERENCES \`doctors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`clinic\` ADD CONSTRAINT \`FK_c9db2c892b3041d00ff6c56d032\` FOREIGN KEY (\`hospital_id\`) REFERENCES \`hospital\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`doctors\` ADD CONSTRAINT \`FK_01f41c4435b1e13060e05fdd557\` FOREIGN KEY (\`clinicId\`) REFERENCES \`clinic\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6ea478e0c37ff2f69e32cfb94c0\` FOREIGN KEY (\`doctor_id\`) REFERENCES \`doctors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6da026cf705d995e70c1b1c106b\` FOREIGN KEY (\`hospital_id\`) REFERENCES \`hospital\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6da026cf705d995e70c1b1c106b\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6ea478e0c37ff2f69e32cfb94c0\``);
        await queryRunner.query(`ALTER TABLE \`doctors\` DROP FOREIGN KEY \`FK_01f41c4435b1e13060e05fdd557\``);
        await queryRunner.query(`ALTER TABLE \`clinic\` DROP FOREIGN KEY \`FK_c9db2c892b3041d00ff6c56d032\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_2d6a1941bd705056030c2b9e07d\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_940bd0b46d069bfecf93300ee5c\``);
        await queryRunner.query(`ALTER TABLE \`prescriptions\` DROP FOREIGN KEY \`FK_445a188ea85a1dba47dc19900e5\``);
        await queryRunner.query(`ALTER TABLE \`prescription_medicine\` DROP FOREIGN KEY \`FK_a4665acebe251147a0b8267567a\``);
        await queryRunner.query(`ALTER TABLE \`prescription_medicine\` DROP FOREIGN KEY \`FK_3d5495fd9b8ecbee8074dc50b95\``);
        await queryRunner.query(`ALTER TABLE \`dosage_schedule\` DROP FOREIGN KEY \`FK_d74ed3a675829865322adbdc9ce\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_36cc65c41268c0483eb22556e29\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_01733651151c8a1d6d980135cc4\``);
        await queryRunner.query(`DROP TABLE \`disease\``);
        await queryRunner.query(`DROP INDEX \`REL_6da026cf705d995e70c1b1c106\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_6ea478e0c37ff2f69e32cfb94c\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`doctors\``);
        await queryRunner.query(`DROP TABLE \`clinic\``);
        await queryRunner.query(`DROP TABLE \`hospital\``);
        await queryRunner.query(`DROP TABLE \`prescriptions\``);
        await queryRunner.query(`DROP TABLE \`prescription_medicine\``);
        await queryRunner.query(`DROP TABLE \`dosage_schedule\``);
        await queryRunner.query(`DROP TABLE \`medicines\``);
        await queryRunner.query(`DROP TABLE \`appointments\``);
    }

}
