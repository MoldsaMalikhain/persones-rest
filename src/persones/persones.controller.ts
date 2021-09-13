/* eslint-disable prettier/prettier */
import { Body, Controller, Get, ParseIntPipe, Post } from '@nestjs/common';
import CreatePersonesDto from './create-persones.dto';
import { PersonesService } from './persones.service';

@Controller('persones')
export class PersonesController {

  constructor(private readonly personesServis: PersonesService) { }

  @Post('post')
  postPersone(@Body() person: CreatePersonesDto) {
    return this.personesServis.insert(person)
  }

  @Get()
  getAll() {
    return this.personesServis.getAllPersones();
  }

  @Get('skills')
  getSkills(@Body(`persone_id`, ParseIntPipe) persone_id: number) {
    return this.personesServis.getSkillsOfPerson(persone_id);
  }
}
