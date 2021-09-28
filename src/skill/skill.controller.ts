import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ROLES } from 'magic.const';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import CreateSkillsDto from 'src/dto/create/skill-create.dto';
import { Roles } from 'src/roles.decorator';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getAll() {
    return this.skillService.getAll();
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateSkillsDto) {
    return this.skillService.create(dto);
  }
}
