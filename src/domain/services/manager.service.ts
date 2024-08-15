import { Inject, Injectable } from '@nestjs/common';
import { Manager } from 'src/domain/entities/manager.entity';
import { CreateManagerDto } from '../../application/dtos/manager/create-manager.dto';
import { Client } from 'src/domain/entities/clients.entity';
import { CreateClientDto } from 'src/application/dtos/client/create-client.dto';
import { AccountType } from 'src/domain/enums/type-account.enum';
import { AccountFactory } from 'src/domain/entities/accounts/account.factory';
import { IManagerRepository } from '../interfaces/manager.interface';
import { ClientRepository } from 'src/infrastructure/repository/client.repository';
import { Account } from '../entities/accounts/account.entity';
import { AccountRepository } from 'src/infrastructure/repository/account.repository';

@Injectable()
export class ManagerService {
  constructor(
    @Inject('IManagerRepository')
    private readonly managerRepository: IManagerRepository,
    @Inject('IClientRepository')
    private readonly clientRepository: ClientRepository,
    @Inject('IAccountRepository')
    private readonly accountRepository: AccountRepository,
  ) {}

  async createManager(createManagerDto: CreateManagerDto): Promise<Manager> {
    const { fullName } = createManagerDto;

    const newManager = new Manager(fullName);

    return await this.managerRepository.save(newManager);
  }

  async getAllManager(): Promise<Manager[]> {
    return await this.managerRepository.findAll();
  }

  async getManagerById(id: string): Promise<Manager> {
    return await this.managerRepository.findById(id);
  }

  async updateManager(
    id: string,
    createManagerDto: CreateManagerDto,
  ): Promise<Manager | null> {
    const manager = await this.getManagerById(id);

    if (manager) {
      manager.fullName = createManagerDto.fullName;
      return await this.managerRepository.save(manager);
    }

    return null;
  }

  async removeManager(id: string): Promise<boolean> {
    const manager = await this.getManagerById(id);

    if (!manager) {
      throw new Error('Manager not found');
    }

    return await this.managerRepository.delete(id);
  }

  async addClient(
    idManager: string,
    createClientDto: CreateClientDto,
  ): Promise<Client> {
    const manager = await this.getManagerById(idManager);
    if (!manager) {
      throw new Error('Manager not found');
    }

    const { fullName, adress, phoneNumber, monthlyIncome } = createClientDto;
    const newClient = new Client(
      fullName,
      adress,
      phoneNumber,
      monthlyIncome,
      manager,
    );

    return await this.clientRepository.save(newClient);
  }

  async removeClient(idManager: string, idClient: string): Promise<boolean> {
    const manager = await this.getManagerById(idManager);
    if (!manager) {
      throw new Error('Manager not found');
    }

    const client = await this.clientRepository.findById(idClient);
    if (!client) {
      throw new Error('Client not found');
    }

    await this.clientRepository.delete(client.id);
    return true;
  }

  async openAccountForClient(
    idManager: string,
    idClient: string,
    type: AccountType,
  ): Promise<Account> {
    const manager = await this.getManagerById(idManager);
    if (!manager) {
      throw new Error('Manager not found');
    }

    const client = await this.clientRepository.findById(idClient);
    if (!client) {
      throw new Error('Client not found');
    }

    const account = AccountFactory.createAccount(type, idClient);

    return await this.accountRepository.save(account);
  }

  async closeAccountForClient(
    idManager: string,
    idClient: string,
    idAccount: string,
  ): Promise<boolean> {
    const manager = this.getManagerById(idManager);

    if (!manager) {
      throw new Error('Manager not found');
    }

    const client = await this.clientRepository.findById(idClient);
    if (!client) {
      throw new Error('Client not found');
    }

    const account = await this.accountRepository.findById(idAccount);

    if (!account) {
      throw new Error('Account not found');
    }

    return await this.accountRepository.delete(idAccount);
  }
}
