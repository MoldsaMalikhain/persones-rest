/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from 'src/entities/currencies.entity';
import { CurrencyRecords } from 'src/entities/currency-records.entity';
import { Salaries } from 'src/entities/salaries.entity';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Currencies, CurrencyRecords, Salaries])],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule { }
