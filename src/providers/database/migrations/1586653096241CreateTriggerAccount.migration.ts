import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTransactionTrigger1634677322886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE OR REPLACE FUNCTION check_transaction() RETURNS TRIGGER AS $$
        DECLARE
            total_blocks_amount NUMERIC;
        BEGIN
            -- Verifica se existem transações associadas à conta
            IF (SELECT COUNT(*) FROM transactions WHERE account_id = NEW.account_id) > 0 THEN
                -- Calcula a soma das transaction_blocks ativas para a conta relacionada
                SELECT COALESCE(SUM(amount), 0)
                INTO total_blocks_amount
                FROM transaction_blocks
                WHERE transaction_id IN (
                    SELECT id
                    FROM transactions
                    WHERE account_id = NEW.account_id
                ) AND is_active = TRUE;
            ELSE
                total_blocks_amount := 0;
            END IF;

            -- Verifica se a soma das transaction_blocks ativas mais a nova transação é maior que o saldo da conta
            IF (total_blocks_amount + NEW.amount) > (SELECT balance FROM accounts WHERE id = NEW.account_id) THEN
                RAISE EXCEPTION 'Transação não permitida. Saldo insuficiente.';
            END IF;

            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER before_transaction_insert
        BEFORE INSERT ON transactions
        FOR EACH ROW
        EXECUTE FUNCTION check_transaction();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP TRIGGER before_transaction_insert ON transactions;',
    );
    await queryRunner.query('DROP FUNCTION check_transaction();');
  }
}
