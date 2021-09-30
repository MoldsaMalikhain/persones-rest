import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Currencies])],
  providers: [CurrencyService],
  exports: [CurrencyService],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
