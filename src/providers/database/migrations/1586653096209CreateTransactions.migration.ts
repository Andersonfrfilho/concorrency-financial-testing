import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class CreateTransactions1586653096209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amount',
            type: 'bigint',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'account_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FKAccountTransactions',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['account_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable('transactions');
  }
}
