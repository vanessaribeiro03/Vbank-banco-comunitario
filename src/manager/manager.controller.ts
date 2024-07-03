import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';

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
}
