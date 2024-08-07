import { AccountType } from 'src/domain/enums/type-account.enum';

export class Account {
  public numberAccount: string;
  public balance: number = 0;
  public type: AccountType;
  public clientId: string;

  constructor(type: AccountType, clientId: string) {
    this.numberAccount = randomNumber();
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

function randomNumber(): string {
  return Math.floor(Math.random() * 1000000000).toString();
}
