import { Manager } from './manager.entity';
import { Account } from './accounts/account.entity';
import { v4 as uuidv4 } from 'uuid';

export class Client {
  public id: string;
  public fullName: string;
  public adress: string;
  public phoneNumber: string;
  public accounts: Account[];
  public monthlyIncome: number;
  public manager: Manager | undefined;

  constructor(
    fullName: string,
    adress: string,
    phoneNumber: string,
    monthlyIncome: number,
    manager?: Manager,
  ) {
    this.id = uuidv4();
    this.fullName = fullName;
    this.adress = adress;
    this.phoneNumber = phoneNumber;
    this.monthlyIncome - monthlyIncome;
    this.accounts = [];
    this.manager = manager;
  }

  openAccount(account: Account): void {
    this.accounts.push(account);
  }
  closeAccount(account: Account): void {
    this.accounts = this.accounts.filter(acc => acc !== account);
  }
  changeAccountType(): void {}
}
