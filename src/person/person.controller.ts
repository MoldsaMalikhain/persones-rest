import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  getAll() {
    return this.personService.getAll();
  }

  @Post()
  createUser(@Body() dto: CreatePersonesDto) {
    return this.personService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.personService.delete(_id);
  }
}
