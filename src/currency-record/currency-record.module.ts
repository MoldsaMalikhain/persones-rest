import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Companies } from 'src/entity/companies.entity';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { CurrencyRecordService } from './currency-record.service';
import { CurrencyRecordController } from './currency-record.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRecords, Currencies, Companies])],
  providers: [CurrencyRecordService],
  exports: [CurrencyRecordService],
  controllers: [CurrencyRecordController],
})
export class CurrencyRecordModule {}
