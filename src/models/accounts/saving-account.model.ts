import { Client } from 'src/models/clients.model';
import { Account } from './account.model';

export class SavingAccount extends Account {
  public interestRate: number;

  constructor(client: Client) {
    super(client, 'savings');
  }

  calculateRate(): number {
    return this.balance * this.interestRate;
  }

  transfer(destination: Account, amount: number): void {
    this.withdraw(amount);
    destination.deposit(amount);
  }
}
