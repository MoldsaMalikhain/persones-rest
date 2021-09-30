import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { PersonModule } from 'src/person/person.module';
import { SalaryService } from './salary.service';
import { SalaryController } from './salary.controller';
import { Person } from 'src/entity/person.entity';

@Module({
  imports: [
    forwardRef(() => PersonModule),
    TypeOrmModule.forFeature([Salaries, Currencies, CurrencyRecords, Person]),
  ],
  providers: [SalaryService],
  exports: [SalaryService],
  controllers: [SalaryController],
})
export class SalaryModule {}
