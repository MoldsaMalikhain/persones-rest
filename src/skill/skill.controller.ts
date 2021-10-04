import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { ROLES } from 'magic.const';
import { JwtAuthGuard } from 'src/auth/guard/jwt-guard';
import CreateSkillsDto from 'src/dto/create/skill-create.dto';
import { Skills } from 'src/entity/skills.entity';
import { Roles } from 'src/roles.decorator';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async getAll(): Promise<Skills[]> {
    return this.skillService.getAll();
  }

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateSkillsDto })
  @ApiCreatedResponse({
    description: 'Skills record has been successfully created',
    type: Skills,
  })
  async create(@Body() dto: CreateSkillsDto): Promise<Skills> {
    return this.skillService.create(dto);
  }
}
