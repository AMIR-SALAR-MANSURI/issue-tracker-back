import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1748863356001 implements MigrationInterface {
    name = 'Test1748863356001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`issue\` DROP FOREIGN KEY \`FK_2a52439e62f44b0dd070cc413c9\``);
        await queryRunner.query(`ALTER TABLE \`issue\` CHANGE \`assignedUserId\` \`assignedUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`access_token\` \`access_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`expires_at\` \`expires_at\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`token_type\` \`token_type\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`scope\` \`scope\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`id_token\` \`id_token\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`session_state\` \`session_state\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatarUrl\` \`avatarUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`accessToken\` \`accessToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`issue\` ADD CONSTRAINT \`FK_2a52439e62f44b0dd070cc413c9\` FOREIGN KEY (\`assignedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`issue\` DROP FOREIGN KEY \`FK_2a52439e62f44b0dd070cc413c9\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`accessToken\` \`accessToken\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`avatarUrl\` \`avatarUrl\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`email\` \`email\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`session_state\` \`session_state\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`id_token\` \`id_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`scope\` \`scope\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`token_type\` \`token_type\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`expires_at\` \`expires_at\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`access_token\` \`access_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`accounts\` CHANGE \`refresh_token\` \`refresh_token\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`issue\` CHANGE \`assignedUserId\` \`assignedUserId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`issue\` ADD CONSTRAINT \`FK_2a52439e62f44b0dd070cc413c9\` FOREIGN KEY (\`assignedUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
