import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateAbsenceDto from 'src/dto/create/ansences-create.dto';
import { Absences } from 'src/entity/absences.entity';
import { AbsenceService } from './absence.service';

@ApiTags('Absence')
@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Absences in system' })
  @ApiCreatedResponse({
    description: 'Here is Absences which you want to find',
    type: Absences,
  })
  async getAll(): Promise<Absences[]> {
    return this.absenceService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create Absence in system' })
  @ApiBody({ type: CreateAbsenceDto })
  @ApiCreatedResponse({
    description: 'Absences record has been successfully created',
    type: Absences,
  })
  create(@Body() dto: CreateAbsenceDto): Promise<Absences> {
    return this.absenceService.create(dto);
  }
}
