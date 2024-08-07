import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('create')
  createClient(@Body() createClientDto: CreateClientDto) {
    const client = this.clientsService.createClient(createClientDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Client created successfully',
      data: client,
    };
  }

  @Get()
  getAllClients() {
    const clients = this.clientsService.getAllClients();

    return {
      statusCode: HttpStatus.OK,
      data: clients,
    };
  }

  @Get(':id')
  getClientById(@Param('id') id: string) {
    const clients = this.clientsService.getClientById(id);

    return {
      statusCode: HttpStatus.OK,
      data: clients,
    };
  }

  @Patch('update/:id')
  updateClient(@Param('id') id: string, @Body() updates: UpdateClientDto) {
    const clients = this.clientsService.updateClient(id, updates);

    return {
      statusCode: HttpStatus.OK,
      message: 'client updated successfully',
      data: clients,
    };
  }
}
