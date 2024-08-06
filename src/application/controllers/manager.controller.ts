import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ManagerService } from 'src/domain/services/manager.service';
import { CreateManagerDto } from 'src/application/dtos/manager/create-manager.dto';

import { CreateClientDto } from 'src/application/dtos/client/create-client.dto';
import { AccountType } from 'src/domain/enums/type-account.enum';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create')
  createManager(@Body() createManagerDto: CreateManagerDto) {
    const manager = this.managerService.createManager(createManagerDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Manager create successfully',
      data: manager,
    };
  }

  @Get()
  getAllManager() {
    const manager = this.managerService.getAllManager();
    return {
      statusCode: HttpStatus.OK,
      data: manager,
    };
  }

  @Get(':id')
  getManagerById(@Param('id') id: string) {
    const manager = this.managerService.getManagerById(id);
    return {
      statusCode: HttpStatus.OK,
      data: manager,
    };
  }

  @Put(':id')
  updateManager(@Param('id') id: string, @Body() body: { fullName: string }) {
    const manager = this.managerService.updateManager(id, body.fullName);
    if (!manager) {
      throw new HttpException('Manager not found', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Manager successfully updated',
      data: manager,
    };
  }

  @Post('addClient/:idManager')
  addClient(
    @Param('idManager') idManager: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    const client = this.managerService.addClient(idManager, createClientDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Client created successfully',
      data: client,
    };
  }

  @Delete('removeClient/:idManager/:idClient')
  removeClient(
    @Param('idManager') idManager: string,
    @Param('idClient') idClient: string,
  ) {
    this.managerService.removeClient(idManager, idClient);
    return {
      statusCode: HttpStatus.OK,
      message: 'Client removed',
    };
  }

  @Post('openAccount/:idManager/:idClient')
  openAccountForClient(
    @Param('idManager') idManager: string,
    @Param('idClient') idClient: string,
    @Body('type') type: AccountType,
  ) {
    const account = this.managerService.openAccountForClient(
      idManager,
      idClient,
      type,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Account opened successfully',
      data: account,
    };
  }

  @Delete('removeAccount/:idManager/:idClient/:numberAccount')
  closeAccountForClient(
    @Param('idManager') idManager: string,
    @Param('idClient') idClient: string,
    @Param('numberAccount') numberAccount: string,
  ) {
    this.managerService.closeAccountForClient(
      idManager,
      idClient,
      numberAccount,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Client account removed',
    };
  }
}
