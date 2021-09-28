import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absences } from 'src/entity/absences.entity';
import { AbsenceService } from './absence.service';

@Module({
  imports: [TypeOrmModule.forFeature([Absences])],
  providers: [AbsenceService],
  exports: [AbsenceService],
})
export class AbsenceModule {}
