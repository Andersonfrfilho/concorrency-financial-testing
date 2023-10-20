import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Check,
} from 'typeorm';
import { Transaction } from '../transactions/Transactions.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  // @Check('balance >= "limit_account"')
  balance: number;

  @Column()
  limit_account: number;

  // @OneToMany(() => Transaction, (transaction) => transaction.account)
  // transactions: Transaction[];
}
