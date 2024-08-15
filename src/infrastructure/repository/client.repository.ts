import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from 'src/application/dtos/client/create-client.dto';
import { Client } from 'src/domain/entities/clients.entity';
import { IClientRepository } from 'src/domain/interfaces/client.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findById(id: string): Promise<Client> {
    return await this.clientRepository.findOne({ where: { id } });
  }

  async save(client: CreateClientDto): Promise<Client> {
    return await this.clientRepository.save(client);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.clientRepository.delete(id);
    return result.affected > 0;
  }
}
