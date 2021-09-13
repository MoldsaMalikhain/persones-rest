/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persones } from 'src/entities/persones.entity';
import { PersonesService } from './persones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Persones])],
  providers: [PersonesService],
})
export class PersonesModule { }
