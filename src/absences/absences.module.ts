/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absences } from 'src/entities/absences.entity';
import { Persones } from 'src/entities/persones.entity';
import { AbsencesController } from './absences.controller';
import { AbsencesService } from './absences.service';

@Module({
  imports: [TypeOrmModule.forFeature([Absences, Persones])],
  controllers: [AbsencesController],
  providers: [AbsencesService],
})
export class AbsencesModule { }
