import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { ROLES } from 'magic.const';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import CreateNotesDto from 'src/dto/create/note-create.dto';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import UpdatePersonesDto from 'src/dto/update/person-update.dto';
import { Roles } from 'src/roles.decorator';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly authServise: AuthService,
  ) {}

  @Get()
  async getAll() {
    return this.personService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') _id: number) {
    return this.personService.getById(_id);
  }

  @Roles(ROLES.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() dto: CreatePersonesDto) {
    return this.personService.create(dto);
  }

  @Roles(ROLES.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Body() dto: UpdatePersonesDto, @Param('id') _id: number) {
    console.log('PATCH: Person update');
    return this.personService.update(dto, _id);
  }

  @Roles(ROLES.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Post('create/note')
  async createNote(@Body() dto: CreateNotesDto, @Request() req) {
    console.log('POST: creating the note');
    return this.personService.createNote(dto, req.person);
  }

  @Roles(ROLES.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Patch('update/note/:id')
  async updateNote(@Body() dto: CreateNotesDto, @Param('id') _id: number) {
    return this.personService.updateNote(dto, _id);
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.personService.delete(_id);
  }
}
