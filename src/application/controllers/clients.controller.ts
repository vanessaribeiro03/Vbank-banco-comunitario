import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ClientsService } from '../../domain/services/clients.service';
import { CreateClientDto } from '../dtos/client/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  @Get()
  getAllClients() {
    return this.clientsService.getAllClients();
  }

  @Get(':id')
  getClientById(@Param('id') id: string) {
    return this.clientsService.getClientById(id);
  }

  @Patch('update/:id')
  updateClient(@Param('id') id: string, @Body() client: CreateClientDto) {
    return this.clientsService.updateClient(id, client);
  }
}
