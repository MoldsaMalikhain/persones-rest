import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from 'src/entity/companies.entity';
import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Companies])],
  providers: [CompanyService],
  exports: [CompanyService],
})
export class CompanyModule {}
