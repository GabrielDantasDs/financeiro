import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountController } from './bank_account.controller';
import { BankAccountService } from './bank_account.service';

describe('BankAccountController', () => {
  let controller: BankAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountController],
      providers: [BankAccountService],
    }).compile();

    controller = module.get<BankAccountController>(BankAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
