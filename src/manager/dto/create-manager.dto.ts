import { Client } from 'src/models/clients.model';

export class CreateManagerDto {
  fullName: string;
  clients: Client[] = [];
}
