import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UserMigration1642152512694 implements MigrationInterface {

    // eslint-disable-next-line class-methods-use-this
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                }
            ]
        }), true)
    }

    // eslint-disable-next-line class-methods-use-this
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
