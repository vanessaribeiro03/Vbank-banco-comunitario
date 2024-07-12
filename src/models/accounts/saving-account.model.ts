import { AccountType } from 'src/enums/type-account.enum';
import { Account } from './account.model';

export class SavingAccount extends Account {
  public interestRate: number;

  constructor() {
    super(AccountType.SAVINGS);
  }

  calculateRate(): number {
    return this.balance * this.interestRate;
  }

  transfer(destination: Account, amount: number): void {
    this.withdraw(amount);
    destination.deposit(amount);
  }
}
