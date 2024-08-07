import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account } from 'src/models/accounts/account.model';
import { AccountType } from 'src/enums/type-account.enum';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post(':clientId')
  createAccount(
    @Param('clientId') clientId: string,
    @Body('type') type: AccountType,
  ) {
    const account = this.accountService.createAccount(clientId, type);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Account created successfully',
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
  getAccountByNumber(@Param('numberAccount') numberAccount: string) {
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
  ): Account {
    return this.accountService.deposit(numberAccount, amount);
  }

  @Patch('withdraw/:numberAccount')
  withdraw(
    @Param('numberAccount') numberAccount: string,
    @Body('amount') amount: number,
  ): Account {
    return this.accountService.withdraw(numberAccount, amount);
  }

  @Patch('transfer/:originNumberAccount/:destinationNumberAccount')
  transfer(
    @Param('originNumberAccount') originNumberAccount: string,
    @Param('destinationNumberAccount') destinationNumberAccount: string,
    @Body('amount') amount: number,
  ) {
    this.accountService.transfer(
      originNumberAccount,
      destinationNumberAccount,
      amount,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Transfer successful',
    };
  }

  @Delete()
  closeAccount(
    @Param('clientId') clientId: string,
    @Param('numberAccount') numberAccount: string,
  ) {
    this.accountService.closeAccount(clientId, numberAccount);

    return {
      statusCode: HttpStatus.OK,
      message: 'Account deleted.',
    };
  }
}
