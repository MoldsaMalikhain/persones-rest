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
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import { ROLES } from 'magic.const';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import CreateNotesDto from 'src/dto/create/note-create.dto';
import CreatePersonesDto from 'src/dto/create/person-create.dto';
import CreateSalarysDto from 'src/dto/create/salary-create.dto';
import UpdatePersonesDto from 'src/dto/update/person-update.dto';
import { Notes } from 'src/entity/notes.entity';
import { Person } from 'src/entity/person.entity';
import { Salaries } from 'src/entity/salaries.entity';
import { Roles } from 'src/roles.decorator';
import { SalaryRO } from 'src/salary/salary.interface';
import { SalaryService } from 'src/salary/salary.service';
import { PersonRO } from './person.interface';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(
    private readonly personService: PersonService,
    private readonly authServise: AuthService,
    private readonly salaryService: SalaryService,
  ) {}

  @Get()
  async getAll(): Promise<Person[]> {
    return this.personService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') _id: number): Promise<Person> {
    return this.personService.getById(_id);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreatePersonesDto })
  @ApiCreatedResponse({
    description: 'Person record has been successfully created',
    type: Person,
  })
  async createUser(@Body() dto: CreatePersonesDto): Promise<PersonRO> {
    return this.personService.create(dto);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBody({ type: CreatePersonesDto })
  @ApiCreatedResponse({
    description: 'Person record has been successfully updated',
    type: Person,
  })
  async updateUser(
    @Body() dto: UpdatePersonesDto,
    @Param('id') _id: number,
  ): Promise<Person> {
    console.log('PATCH: Person update');
    return this.personService.update(dto, _id);
  }

  @Roles(ROLES.MANAGER)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateNotesDto })
  @ApiCreatedResponse({
    description: 'Note record has been successfully created',
    type: Notes,
  })
  @Post('note')
  async createNote(
    @Body() dto: CreateNotesDto,
    @Request() req,
  ): Promise<Notes> {
    // console.log(req.person);
    return this.personService.createNote(dto, req.person);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Patch('note/:id')
  @ApiBody({ type: CreateNotesDto })
  @ApiCreatedResponse({
    description: 'Note record has been successfully updated',
    type: Notes,
  })
  async updateNote(
    @Body() dto: CreateNotesDto,
    @Param('id') _id: number,
  ): Promise<Notes> {
    return this.personService.updateNote(dto, _id);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Person record has been successfully deleted',
    type: Person,
  })
  async delete(@Param('id') _id: number) {
    return this.personService.delete(_id);
  }

  // @Roles(ROLES.MANAGER)
  // @UseGuards(JwtAuthGuard)
  @Post('salary')
  @ApiCreatedResponse({
    description: 'Salaries record has been successfully created',
    type: Salaries,
  })
  async createSalary(@Body() dto: CreateSalarysDto): Promise<SalaryRO> {
    return this.salaryService.create(dto);
  }
}
