import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateAbsenceDto from 'src/dto/create/ansences-create.dto';
import { AbsenceService } from './absence.service';

@Controller('absence')
export class AbsenceController {
  constructor(private readonly absenceService: AbsenceService) {}

  @Get()
  async getAll() {
    return this.absenceService.getAll();
  }

  @Post()
  create(@Body() dto: CreateAbsenceDto) {
    return this.absenceService.create(dto);
  }
}
