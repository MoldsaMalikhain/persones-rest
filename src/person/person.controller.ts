import { Body, Controller, Post } from '@nestjs/common';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  createUser(@Body() dto: CreatePersonesDto) {
    return this.personService.create(dto);
  }
}
