import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { RoleModule } from './role/role.module';
import { AbsenceModule } from './absence/absence.module';
import { CompanyModule } from './company/company.module';
import { CurrencyModule } from './currency/currency.module';
import { CurrencyRecordModule } from './currency-record/currency-record.module';
import { NoteModule } from './note/note.module';
import { SalaryModule } from './salary/salary.module';
import { SkillModule } from './skill/skill.module';
import config from '../sqlconf';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    PersonModule,
    AuthModule,
    RoleModule,
    AbsenceModule,
    CompanyModule,
    CurrencyModule,
    CurrencyRecordModule,
    NoteModule,
    SalaryModule,
    SkillModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
