import { AccountType } from 'src/domain/enums/type-account.enum';
import { Account } from './account.entity';

export class SavingAccount extends Account {
  public interestRate: number;

  constructor(clientId: string) {
    super(AccountType.SAVINGS, clientId);
  }

  calculateRate(): number {
    return this.balance * this.interestRate;
  }

  transfer(destination: Account, amount: number): void {
    this.withdraw(amount);
    destination.deposit(amount);
  }
}
