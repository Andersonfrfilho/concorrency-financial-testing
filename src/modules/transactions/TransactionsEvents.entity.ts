import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Transaction } from './Transactions.entity';

@Entity('transactions_events')
export class TransactionEvents {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  transaction_id: string;

  @ManyToOne(() => Transaction, (transaction) => transaction.blocks)
  transaction: Transaction;
}
