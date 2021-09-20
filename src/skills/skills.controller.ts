/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateSkillsDto from './create-skills.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {

    constructor(private readonly skillService: SkillsService) { }

    @Post()
    insert(@Body() createSkillDto: CreateSkillsDto) {
        return this.skillService.createSkill(createSkillDto)
    }

    @Get()
    getSkills() {
        return this.skillService.getSkills()
    }

    @Get('name/:name')
    getSkillByName(@Param('name') name: string) {
        return this.skillService.getByName(name);
    }

    @Get(':id')
    getSkillById(@Param('id') _id: number) {
        return this.skillService.getById(_id);
    }

}
