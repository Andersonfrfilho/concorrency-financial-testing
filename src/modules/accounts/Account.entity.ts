import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from '../transactions/Transactions.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  number: string;

  @Column()
  balance: number;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];
}
