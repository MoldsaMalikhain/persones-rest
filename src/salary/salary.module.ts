import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Salaries } from 'src/entity/salaries.entity';
import { SalaryService } from './salary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Salaries])],
  providers: [SalaryService],
  exports: [SalaryService],
})
export class SalaryModule {}
