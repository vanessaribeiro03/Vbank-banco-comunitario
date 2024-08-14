import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TransactionsType } from '../enums/type-transactions.enum';
import { Account } from './accounts/account.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public type: TransactionsType;

  @Column()
  public amount: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @ManyToOne(() => Account, account => account.transactions)
  public account: Account;

  @Column({ nullable: true })
  public relatedAccountId?: string;

  constructor(
    type: TransactionsType,
    amount: number,
    account: Account,
    relatedAccountId?: string,
  ) {
    this.type = type;
    this.amount = amount;
    this.account = account;
    this.relatedAccountId = relatedAccountId;
  }
}
