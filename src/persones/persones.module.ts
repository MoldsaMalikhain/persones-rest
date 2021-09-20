/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absences } from 'src/entities/absences.entity';
import { Notes } from 'src/entities/notes.entity';
import { Persones } from 'src/entities/persones.entity';
import { Roles } from 'src/entities/roles.entity';
import { Salaries } from 'src/entities/salaries.entity';
import { Skills } from 'src/entities/skills.entity';
import { PersonesController } from './persones.controller';
import { PersonesService } from './persones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persones, Skills, Absences, Notes, Salaries, Roles])],
  controllers: [PersonesController],
  providers: [PersonesService],
})
export class PersonesModule { }
