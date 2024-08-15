import {
  Body,
  Controller,
  Delete,
  Get,
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
    return this.managerService.createManager(createManagerDto);
  }

  @Get()
  getAllManager() {
    return this.managerService.getAllManager();
  }

  @Get(':id')
  getManagerById(@Param('id') id: string) {
    return this.managerService.getManagerById(id);
  }

  @Put(':id')
  updateManager(
    @Param('id') id: string,
    @Body() createManagerDto: CreateManagerDto,
  ) {
    return this.managerService.updateManager(id, createManagerDto);
  }

  @Delete(':id')
  removeManager(@Param('id') id: string) {
    return this.managerService.removeManager(id);
  }

  @Post('addClient/:idManager')
  addClient(
    @Param('idManager') idManager: string,
    @Body() createClientDto: CreateClientDto,
  ) {
    return this.managerService.addClient(idManager, createClientDto);
  }

  @Delete('removeClient/:idManager/:idClient')
  removeClient(
    @Param('idManager') idManager: string,
    @Param('idClient') idClient: string,
  ) {
    return this.managerService.removeClient(idManager, idClient);
  }

  @Post('openAccount/:idManager/:idClient')
  openAccountForClient(
    @Param('idManager') idManager: string,
    @Param('idClient') idClient: string,
    @Body('type') type: AccountType,
  ) {
    return this.managerService.openAccountForClient(idManager, idClient, type);
  }

  @Delete('removeAccount/:idManager/:idClient/:numberAccount')
  closeAccountForClient(
    @Param('idManager') idManager: string,
    @Param('idClient') idClient: string,
    @Param('numberAccount') numberAccount: string,
  ) {
    return this.managerService.closeAccountForClient(
      idManager,
      idClient,
      numberAccount,
    );
  }
}
