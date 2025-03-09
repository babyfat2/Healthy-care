import { MigrationInterface, QueryRunner } from "typeorm";

export class AddResetpassword1741354814258 implements MigrationInterface {
    name = 'AddResetpassword1741354814258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`reset_token\` varchar(256) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`reset_token\``);
    }

}
