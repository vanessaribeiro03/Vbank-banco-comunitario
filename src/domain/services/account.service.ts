import { Inject, Injectable } from '@nestjs/common';
import { Account } from 'src/domain/entities/accounts/account.entity';
import { ClientsService } from 'src/domain/services/clients.service';
import { AccountType } from 'src/domain/enums/type-account.enum';
import { AccountFactory } from 'src/domain/entities/accounts/account.factory';
import { IAccountRepository } from '../interfaces/account.interface';
import { ITransactionRepository } from '../interfaces/transactions.interface';
import { Transaction } from '../entities/transactions.entity';
import { TransactionsType } from '../enums/type-transactions.enum';

@Injectable()
export class AccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
    private readonly clientsService: ClientsService,
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  async createAccount(clientId: string, type: AccountType): Promise<Account> {
    const client = this.clientsService.getClientById(clientId);
    if (!client) {
      throw new Error('Client not found');
    }

    const account = AccountFactory.createAccount(type, clientId);

    return await this.accountRepository.save(account);
  }

  async getAllAccounts(): Promise<Account[]> {
    return await this.accountRepository.findAll();
  }

  async getAccountById(id: string): Promise<Account> {
    return await this.accountRepository.findById(id);
  }

  async deleteAccount(id: string): Promise<boolean> {
    const account = await this.getAccountById(id);

    if (!account) {
      throw new Error('Account not found');
    }

    return await this.accountRepository.delete(id);
  }

  async deposit(id: string, amount: number): Promise<Account> {
    const account = await this.accountRepository.findById(id);

    if (account) {
      account.balance += amount;

      const transaction = new Transaction(
        TransactionsType.DEPOSIT,
        amount,
        account,
      );

      await this.transactionRepository.saveTransaction(transaction);

      return this.accountRepository.save(account);
    }

    throw new Error('Account not found');
  }

  async withdraw(id: string, amount: number): Promise<Account> {
    const account = await this.accountRepository.findById(id);

    if (account) {
      if (account.balance >= amount) {
        account.balance -= amount;

        const transaction = new Transaction(
          TransactionsType.WITHDRAW,
          amount,
          account,
        );

        await this.transactionRepository.saveTransaction(transaction);

        return this.accountRepository.save(account);
      }
      throw new Error('Insufficient funds');
    }
    throw new Error('Account not found');
  }

  async transfer(
    originIdAccount: string,
    destinationIdAccount: string,
    amount: number,
  ): Promise<Account> {
    const originAccount =
      await this.accountRepository.findById(originIdAccount);
    const destinationAccount =
      await this.accountRepository.findById(destinationIdAccount);

    if (!originAccount || !destinationAccount) {
      throw new Error('One or both accounts not found');
    }

    if (originAccount.balance < amount) {
      throw new Error('Insufficient funds');
    }

    originAccount.balance -= amount;
    destinationAccount.balance += amount;

    const transactionSent = new Transaction(
      TransactionsType.TRANSFER_SENT,
      amount,
      originAccount,
      destinationIdAccount,
    );

    await this.transactionRepository.saveTransaction(transactionSent);

    const transactionReceived = new Transaction(
      TransactionsType.TRANSFER_RECEIVED,
      amount,
      destinationAccount,
      originIdAccount,
    );

    await this.transactionRepository.saveTransaction(transactionReceived);

    await this.accountRepository.save(originAccount);
    return this.accountRepository.save(destinationAccount);
  }

  async getAccountTransactions(accountId: string): Promise<Transaction[]> {
    return await this.transactionRepository.getTransactionByAccountId(
      accountId,
    );
  }

  // **esse metodo vou implementar depois, com calma**
  // closeAccount(clientId: string, numberAccount: string) {
  //   const client = this.clientsService.getClientById(clientId);
  //   if (!client) {
  //     throw new Error('Client not found');
  //   }

  //   const account = client.accounts.find(
  //     acc => acc.numberAccount === numberAccount,
  //   );

  //   if (!account) {
  //     throw new Error('Account not found');
  //   }

  //   this.accounts = this.accounts.filter(
  //     acc => acc.numberAccount !== numberAccount,
  //   );

  //   client.closeAccount(account);
  // }
}
