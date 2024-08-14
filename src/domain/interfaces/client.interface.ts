import { CreateClientDto } from 'src/application/dtos/client/create-client.dto';
import { Client } from '../entities/clients.entity';

export interface IClientRepository {
  findAll(): Promise<Client[]>;
  findById(id: string): Promise<Client>;
  save(client: CreateClientDto): Promise<Client>;
  delete(id: string): Promise<boolean>;
}
