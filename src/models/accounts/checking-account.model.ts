import { Client } from 'src/models/clients.model';
import { Account } from './account.model';

export class CheckingAccount extends Account {
  public overdraft: number = 100.0;

  constructor(client: Client) {
    super(client, 'current');
  }

  withdram(amount: number): void {
    if (amount > this.balance + this.overdraft) {
      throw new Error('Insufficient balance and overdraft exceeded');
    }

    this.balance -= amount;
  }
}
