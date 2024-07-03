import { Client } from 'src/models/clients.model';

export class Account {
  public balance: number = 0;
  public client: Client | undefined;
  public type: 'current' | 'savings';
  public numberAccount: string;

  constructor(client: Client, type: 'current' | 'savings') {
    this.client = client;
    this.type = type;
    this.numberAccount = randomNumber();
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
