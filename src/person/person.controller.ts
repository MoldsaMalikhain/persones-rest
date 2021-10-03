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
import CreateSalarysDto from 'src/dto/create/salary-create.dto';
import UpdatePersonesDto from 'src/dto/update/person-update.dto';
import { Roles } from 'src/roles.decorator';
import { SalaryService } from 'src/salary/salary.service';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly authServise: AuthService,
    private readonly salaryService: SalaryService,
  ) {}

  @Get()
  async getAll() {
    return this.personService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') _id: number) {
    return this.personService.getById(_id);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() dto: CreatePersonesDto) {
    return this.personService.create(dto);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Body() dto: UpdatePersonesDto, @Param('id') _id: number) {
    console.log('PATCH: Person update');
    return this.personService.update(dto, _id);
  }

  @Roles(ROLES.MANAGER)
  @UseGuards(JwtAuthGuard)
  @Post('note')
  async createNote(@Body() dto: CreateNotesDto, @Request() req) {
    // console.log(req.person);
    return this.personService.createNote(dto, req.person);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Patch('note/:id')
  async updateNote(@Body() dto: CreateNotesDto, @Param('id') _id: number) {
    return this.personService.updateNote(dto, _id);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.personService.delete(_id);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Post('salary')
  async createSalary(@Body() dto: CreateSalarysDto) {
    return this.salaryService.create(dto);
  }
}
