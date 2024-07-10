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
    monthlyIncome: number,
    manager?: Manager,
  ) {
    super(fullName);
    this.adress = adress;
    this.phoneNumber = phoneNumber;
    this.monthlyIncome - monthlyIncome;
    this.manager = manager;
  }
}
