import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/domain/entities/accounts/account.entity';
import { IAccountRepository } from 'src/domain/interfaces/account.interface';
import { Repository } from 'typeorm';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async findById(id: string): Promise<Account> {
    return await this.accountRepository.findOne({ where: { id } });
  }

  async save(account: Account): Promise<Account> {
    return await this.accountRepository.save(account);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.accountRepository.delete(id);
    return result.affected > 0;
  }
}
