/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonesModule } from './persones/persones.module';
import config from './mysql.config';
import { Connection } from 'typeorm';
import { NotesModule } from './notes/notes.module';
import { RolesModule } from './roles/roles.module';
import { SalariesModule } from './salaries/salaries.module';
import { SkillsModule } from './skills/skills.module';
import { CurrencyRecordsModule } from './currency-records/currency-records.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CompaniesModule } from './companies/companies.module';
import { AbsencesModule } from './absences/absences.module';
@Module({
  imports: [TypeOrmModule.forRoot(config),
    PersonesModule,
    NotesModule,
    RolesModule,
    SalariesModule,
    SkillsModule,
    CurrencyRecordsModule,
    CurrenciesModule,
    CompaniesModule,
    AbsencesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
