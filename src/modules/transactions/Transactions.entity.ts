import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Account } from '../accounts/Account.entity';
import { TransactionEvents } from './TransactionsEvents.entity';
import { TransactionBlocks } from './TransactionsBlocks.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @Column()
  account_id: string;

  // @ManyToOne(() => Account, (account) => account.transactions)
  // account: Account;

  // @OneToMany(
  //   () => TransactionEvents,
  //   (transactionEvents) => transactionEvents.transaction,
  // )
  // events: TransactionEvents[];

  // @OneToMany(
  //   () => TransactionBlocks,
  //   (transactionBlocks) => transactionBlocks.transaction,
  // )
  // blocks: TransactionBlocks[];
}
