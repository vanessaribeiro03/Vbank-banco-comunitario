import { AccountType } from 'src/domain/enums/type-account.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../clients.entity';
import { Transaction } from '../transactions.entity';

@Entity('accounts')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public balance: number = 0;

  @Column()
  public type: AccountType;

  @Column()
  public clientId: string;

  @ManyToOne(() => Client, client => client.accounts)
  @JoinColumn({ name: 'client_id' })
  public client: Client;

  @OneToMany(() => Transaction, transaction => transaction.account, {
    cascade: true,
  })
  public transactions: Transaction[];

  constructor(type: AccountType, clientId: string) {
    this.type = type;
    this.clientId = clientId;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }
    this.balance -= amount;
  }

  transfer(destination: Account, amount: number): void {
    if (amount > this.balance) {
      throw new Error('Insufficient funds');
    }

    this.withdraw(amount);
    destination.deposit(amount);
  }

  getBalance(): number {
    return this.balance;
  }
}
