/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Companies } from 'src/entity/companies.entity';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { CurrencyRecordsController } from './currency-records.controller';
import { CurrencyRecordsService } from './currency-records.service';


@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRecords, Currencies, Companies])],
  controllers: [CurrencyRecordsController],
  providers: [CurrencyRecordsService],
})
export class CurrencyRecordsModule { }
