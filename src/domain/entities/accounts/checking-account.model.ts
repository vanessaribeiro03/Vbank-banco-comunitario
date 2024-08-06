import { AccountType } from 'src/domain/enums/type-account.enum';
import { Account } from './account.model';

export class CheckingAccount extends Account {
  public overdraft: number = 100.0;
  public balanceTotal: number = 0;

  constructor() {
    super(AccountType.CURRENT);
    this.balanceTotal = this.balance + this.overdraft;
  }

  deposit(amount: number): void {
    this.balance += amount;
    this.balanceTotal = this.balance + this.overdraft;
  }

  withdraw(amount: number): void {
    if (amount > this.balanceTotal) {
      throw new Error('Insufficient balance and overdraft exceeded');
    }
    this.balance -= amount;
    this.balanceTotal = this.balance + this.overdraft;
  }

  transfer(destination: Account, amount: number): void {
    if (amount > this.balanceTotal) {
      throw new Error('Insufficient balance and overdraft exceeded');
    }
    this.withdraw(amount);
    destination.deposit(amount);
  }

  // deposit(amount: number): void {
  //   const amountTotal = (this.balance += amount);
  //   this.balanceTotal = amountTotal + this.overdraft;
  // }

  // withdraw(amount: number): void {
  //   if (amount > this.balance + this.overdraft) {
  //     throw new Error('Insufficient balance and overdraft exceeded');
  //   }

  //   this.balance -= amount;
  // }
}
