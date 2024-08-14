import { Account } from '../entities/accounts/account.entity';

export interface IAccountRepository {
  findAll(): Promise<Account[]>;
  findById(id: string): Promise<Account>;
  save(account: Account): Promise<Account>;
  delete(id: string): Promise<boolean>;
}
