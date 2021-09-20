/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Companies } from 'src/entities/companies.entity';
import { Currencies } from 'src/entities/currencies.entity';
import { CurrencyRecords } from 'src/entities/currency-records.entity';
import { CurrencyRecordsController } from './currency-records.controller';
import { CurrencyRecordsService } from './currency-records.service';


@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRecords, Currencies, Companies])],
  controllers: [CurrencyRecordsController],
  providers: [CurrencyRecordsService],
})
export class CurrencyRecordsModule { }
