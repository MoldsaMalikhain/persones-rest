import { Module } from '@nestjs/common';
import { CurrencyRecordsController } from './currency-records.controller';

@Module({
  controllers: [CurrencyRecordsController]
})
export class CurrencyRecordsModule {}
