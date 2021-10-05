import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRecordController } from './currency-record.controller';

describe('CurrencyRecordController', () => {
  let controller: CurrencyRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyRecordController],
    }).compile();

    controller = module.get<CurrencyRecordController>(CurrencyRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
