import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from 'src/models/accounts/account.model';
import { ClientsService } from 'src/clients/clients.service';
import { AccountType } from 'src/enums/type-account.enum';
import { AccountFactory } from 'src/models/accounts/account.factory';

@Injectable()
export class AccountService {
  private accounts: Account[] = [];

  constructor(private readonly clientsService: ClientsService) {}

  createAccount(clienteId: string, type: AccountType): Account {
    const client = this.clientsService.getClientById(clienteId);
    if (!client) {
      throw new Error('Client not found');
    }

    const account = AccountFactory.createAccount(type);

    this.accounts.push(account);
    client.openAccount(account);

    return account;
  }

  getAllAccounts(): Account[] {
    return this.accounts;
  }

  getAccountByNumber(numberAccount: string): Account {
    return this.accounts.find(
      account => account.numberAccount === numberAccount,
    );
  }

  deposit(numberAccount: string, amount: number): Account {
    const account = this.getAccountByNumber(numberAccount);
    if (amount < 0) {
      throw new BadRequestException('Amount must be positive');
    }
    account.deposit(amount);
    return account;
  }

  withdraw(numberAccount: string, amount: number): Account {
    const account = this.getAccountByNumber(numberAccount);
    if (amount < 0) {
      throw new BadRequestException('Amount must be positive');
    }

    account.withdraw(amount);
    return account;
  }

  transfer(
    originNumberAccount: string,
    destinationNumberAccount: string,
    amount: number,
  ) {
    const originAccount = this.getAccountByNumber(originNumberAccount);
    const destinationAccount = this.getAccountByNumber(
      destinationNumberAccount,
    );

    if (amount < 0) {
      throw new BadRequestException('Amount must be positive');
    }

    originAccount.transfer(destinationAccount, amount);
  }

  closeAccount(clientId: string, numberAccount: string) {
    const client = this.clientsService.getClientById(clientId);
    if (!client) {
      throw new Error('Client not found');
    }

    const account = client.accounts.find(
      acc => acc.numberAccount === numberAccount,
    );

    if (!account) {
      throw new Error('Account not found');
    }

    this.accounts = this.accounts.filter(
      acc => acc.numberAccount !== numberAccount,
    );

    client.closeAccount(account);
  }
}
