import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class CreateAccounts1586653096209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'number',
            type: 'uuid',
          },
          {
            name: 'balance',
            type: 'bigint',
          },
        ],
      }),
    );
  }
  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable('accounts');
  }
}
