import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class CreateTransactionsEvents1586653096209
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions_events',
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
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'transaction_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'FKTransactionsTransactionsEvents',
            referencedTableName: 'transactions',
            referencedColumnNames: ['id'],
            columnNames: ['transaction_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable('transactions_events');
  }
}
