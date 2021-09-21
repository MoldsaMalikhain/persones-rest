/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Absences } from 'src/entity/absences.entity';
import { Notes } from 'src/entity/notes.entity';
import { Persones } from 'src/entity/persones.entity';
import { Roles } from 'src/entity/roles.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { Skills } from 'src/entity/skills.entity';
import { PersonesController } from './persones.controller';
import { PersonesService } from './persones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persones, Skills, Absences, Notes, Salaries, Roles])],
  controllers: [PersonesController],
  providers: [PersonesService],
})
export class PersonesModule { }
