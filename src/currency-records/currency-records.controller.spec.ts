import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRecordsController } from './currency-records.controller';

describe('CurrencyRecordsController', () => {
  let controller: CurrencyRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyRecordsController],
    }).compile();

    controller = module.get<CurrencyRecordsController>(CurrencyRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
