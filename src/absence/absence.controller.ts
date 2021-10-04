import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import CreateAbsenceDto from 'src/dto/create/ansences-create.dto';
import { Absences } from 'src/entity/absences.entity';
import { AbsenceService } from './absence.service';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Get()
  async getAll(): Promise<Absences[]> {
    return this.absenceService.getAll();
  }

  @Post()
  @ApiBody({ type: CreateAbsenceDto })
  @ApiCreatedResponse({
    description: 'Absences record has been successfully created',
    type: Absences,
  })
  create(@Body() dto: CreateAbsenceDto): Promise<Absences> {
    return this.absenceService.create(dto);
  }
}
