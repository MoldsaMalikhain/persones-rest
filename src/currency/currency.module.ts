import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyService } from './currency.service';

@Module({
  imports: [TypeOrmModule.forFeature([Currencies])],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
