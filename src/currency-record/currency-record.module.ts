import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { CurrencyRecordService } from './currency-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRecords])],
  providers: [CurrencyRecordService],
  exports: [CurrencyRecordService],
})
export class CurrencyRecordModule {}
