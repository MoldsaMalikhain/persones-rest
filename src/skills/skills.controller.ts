/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import UpdateSkillsDto from 'src/dto/update/update-skill.dto';
import CreateSkillsDto from '../dto/create/create-skills.dto';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {

    constructor(private readonly skillService: SkillsService) { }

    @Post()
    insert(@Body() createSkillDto: CreateSkillsDto) {
        return this.skillService.createSkill(createSkillDto)
    }

    @Patch(':id')
    update(@Param('id') _id: number, dto: UpdateSkillsDto) {
        return this.skillService.update(_id, dto)
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

    @Delete(':id')
    delete(@Param('id') _id: number) {
        return this.skillService.delete(_id)
    }

}
