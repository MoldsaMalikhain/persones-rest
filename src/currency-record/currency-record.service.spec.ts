import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRecordService } from './currency-record.service';

describe('CurrencyRecordService', () => {
  let service: CurrencyRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyRecordService],
    }).compile();

    service = module.get<CurrencyRecordService>(CurrencyRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
