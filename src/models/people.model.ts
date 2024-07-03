import { v4 as uuidv4 } from 'uuid';
import { Account } from './accounts/account.model';

export class People {
  public fullName: string;
  public id: string;
  public accounts: Account[] = [];

  constructor(fullName: string) {
    this.fullName = fullName;
    this.id = uuidv4();
  }

  public openAccount(account: Account): void {
    this.accounts.push(account);
  }

  public closeAccount(): void {}

  public changeAccountType(): void {}
}
