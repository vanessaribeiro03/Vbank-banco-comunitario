import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../entities/clients.entity';
import { CreateClientDto } from '../../application/dtos/client/create-client.dto';
import { IClientRepository } from '../interfaces/client.interface';

@Injectable()
export class ClientsService {
  private clients: Client[] = [];

  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
  ) {}

  async createClient(createClientDto: CreateClientDto): Promise<Client> {
    const { fullName, adress, phoneNumber, monthlyIncome } = createClientDto;

    const newClient = new Client(fullName, adress, phoneNumber, monthlyIncome);

    this.clients.push(newClient);

    return await this.clientRepository.save(newClient);
  }

  async getAllClients(): Promise<Client[]> {
    return await this.clientRepository.findAll();
  }

  async getClientById(id: string): Promise<Client> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new Error('User not found');
    }

    return client;
  }

  async updateClient(
    id: string,
    createClient: CreateClientDto,
  ): Promise<Client> {
    const client = this.getClientById(id);

    if (!client) {
      throw new Error('User not found');
    }

    return await this.clientRepository.save(createClient);
  }
}
