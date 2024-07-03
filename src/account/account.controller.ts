import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CheckingAccount } from 'src/models/accounts/checking-account.model';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post(':clientId')
  createAccount(
    @Param('clientId') clientId: string,
    @Body('type') type: 'current' | 'savings',
  ) {
    const account = this.accountService.createAccount(clientId, type);
    return {
      statusCode: HttpStatus.CREATED,
      message: `Account ${type} created`,
      numberAccount: account.numberAccount,
      balance: account.balance,
      overdraft:
        type === 'current' ? (account as CheckingAccount).overdraft : undefined,
      client: {
        fullName: account.client?.fullName,
        id: account.client?.id,
        adress: account.client?.adress,
        phoneNumber: account.client?.phoneNumber,
      },
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
  getAccountById(@Param('numberAccount') numberAccount: string) {
    const accounts = this.accountService.getAccountById(numberAccount);

    return {
      statusCode: HttpStatus.OK,
      data: accounts,
    };
  }
}
