import { Client } from 'src/models/clients.model';

export class Account {
  public numberAccount: string;
  public balance: number = 0;
  public type: 'current' | 'savings';
  public client: Client | undefined;

  constructor(client: Client, type: 'current' | 'savings') {
    this.numberAccount = randomNumber();
    this.type = type;
    this.client = client;
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

function randomNumber(): string {
  return Math.floor(Math.random() * 1000000000).toString();
}
