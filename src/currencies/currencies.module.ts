/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Currencies, CurrencyRecords, Salaries])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule { }
