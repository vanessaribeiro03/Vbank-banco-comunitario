import {
  Body,
  Controller,
  // Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccountService } from '../../domain/services/account.service';
import { Account } from 'src/domain/entities/accounts/account.entity';
import { AccountType } from 'src/domain/enums/type-account.enum';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post(':clientId')
  createAccount(
    @Param('clientId') clientId: string,
    @Body('type') type: AccountType,
  ) {
    return this.accountService.createAccount(clientId, type);
  }

  @Get()
  getAllAccounts() {
    return this.accountService.getAllAccounts();
  }

  @Get(':numberAccount')
  getAccountByNumber(@Param('numberAccount') numberAccount: string) {
    const accounts = this.accountService.getAccountById(numberAccount);

    return {
      statusCode: HttpStatus.OK,
      data: accounts,
    };
  }

  @Patch('deposit/:numberAccount')
  deposit(
    @Param('numberAccount') numberAccount: string,
    @Body('amount') amount: number,
  ): Promise<Account> {
    return this.accountService.deposit(numberAccount, amount);
  }

  @Patch('withdraw/:numberAccount')
  withdraw(
    @Param('numberAccount') numberAccount: string,
    @Body('amount') amount: number,
  ): Promise<Account> {
    return this.accountService.withdraw(numberAccount, amount);
  }

  @Patch('transfer/:originNumberAccount/:destinationNumberAccount')
  transfer(
    @Param('originNumberAccount') originNumberAccount: string,
    @Param('destinationNumberAccount') destinationNumberAccount: string,
    @Body('amount') amount: number,
  ): Promise<Account> {
    return this.accountService.transfer(
      originNumberAccount,
      destinationNumberAccount,
      amount,
    );
  }

  @Get('transactions/:id')
  getAccountTransactions(@Param('id') id: string) {
    return this.accountService.getAccountTransactions(id);
  }

  // @Delete()
  // closeAccount(
  //   @Param('clientId') clientId: string,
  //   @Param('numberAccount') numberAccount: string,
  // ) {
  //   this.accountService.closeAccount(clientId, numberAccount);

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: 'Account deleted.',
  //   };
  // }
}
