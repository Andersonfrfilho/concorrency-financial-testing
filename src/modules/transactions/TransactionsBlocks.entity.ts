import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Transaction } from './Transactions.entity';

@Entity('transactions_blocks')
export class TransactionBlocks {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @Column()
  transaction_id: string;

  // @ManyToOne(() => Transaction, (transaction) => transaction.events)
  // transaction: Transaction;
}
