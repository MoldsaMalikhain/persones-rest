import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRecordsService } from './currency-records.service';

describe('CurrencyRecordsService', () => {
  let service: CurrencyRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyRecordsService],
    }).compile();

    service = module.get<CurrencyRecordsService>(CurrencyRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
