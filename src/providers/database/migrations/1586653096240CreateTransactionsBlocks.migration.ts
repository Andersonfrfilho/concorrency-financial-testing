import { MigrationInterface, QueryRunner, Table } from 'typeorm';
export class CreateTransactionsBlocks1586653096209
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions_blocks',
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
            name: 'transaction_id',
            type: 'uuid',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
          },
        ],
        foreignKeys: [
          {
            name: 'FKTransactionsTransactionsBlocks',
            referencedTableName: 'transactions',
            referencedColumnNames: ['id'],
            columnNames: ['transaction_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        indices: [{ columnNames: ['active'], isUnique: false }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    queryRunner.dropTable('transactions_blocks');
  }
}
