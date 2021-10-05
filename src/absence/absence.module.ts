import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absences } from 'src/entity/absences.entity';
import { Person } from 'src/entity/person.entity';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Absences, Person])],
  providers: [AbsenceService],
  exports: [AbsenceService],
  controllers: [AbsenceController],
})
export class AbsenceModule {}
