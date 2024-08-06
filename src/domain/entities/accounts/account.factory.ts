import { AccountType } from 'src/domain/enums/type-account.enum';
import { Account } from './account.model';
import { CheckingAccount } from './checking-account.model';
import { SavingAccount } from 'src/domain/entities/accounts/saving-account.model';

export class AccountFactory {
  static createAccount(type: AccountType): Account {
    const accountTypes = {
      [AccountType.CURRENT]: new CheckingAccount(),
      [AccountType.SAVINGS]: new SavingAccount(),
    };

    const account = accountTypes[type];

    if (!account) {
      throw new Error('Invalid account type');
    }

    return account;
  }
}
