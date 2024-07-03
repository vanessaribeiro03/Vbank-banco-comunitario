import { People } from './people.model';
import { Manager } from './manager.model';
import { Account } from './accounts/account.model';

export class Client extends People {
  public adress: string;
  public phoneNumber: string;
  public accounts: Account[];
  public monthlyIncome: number;
  public manager: Manager | undefined;

  constructor(
    fullName: string,
    adress: string,
    phoneNumber: string,
    accounts: Account[],
    monthlyIncome: number,
    manager?: Manager,
  ) {
    super(fullName);
    this.adress = adress;
    this.phoneNumber = phoneNumber;
    this.accounts = accounts;
    this.monthlyIncome - monthlyIncome;
    this.manager = manager;
  }

  public openAccount(account: Account): void {
    this.accounts.push(account);
  }
}
