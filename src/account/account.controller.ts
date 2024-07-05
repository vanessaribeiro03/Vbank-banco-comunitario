import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(
    @Body() body: { clienteId: string; type: 'current' | 'savings' },
  ) {
    const account = this.accountService.createAccount(
      body.clienteId,
      body.type,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: `Account ${body.type} createde`,
      data: account,
    };
  }

  @Get()
  getAllAccounts() {
    const accounts = this.accountService.getAllAccounts();
    return {
      statusCode: HttpStatus.OK,
      data: accounts,
    };
  }

  @Get(':numberAccount')
  getAccountByAccount(@Param('numberAccount') numberAccount: string) {
    const accounts = this.accountService.getAccountByNumber(numberAccount);

    return {
      statusCode: HttpStatus.OK,
      data: accounts,
    };
  }

  @Patch('deposit/:numberAccount')
  deposit(
    @Param('numberAccount') numberAccount: string,
    @Body('amount') amount: number,
  ) {
    console.log('[controller] o valor foi: ', amount);
    return this.accountService.deposit(numberAccount, amount);
  }
}
