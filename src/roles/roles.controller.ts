/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateRolesDto from './create-roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private readonly roleService: RolesService) { }

    @Post()
    create(@Body() roleDto: CreateRolesDto) {
        return this.roleService.inject(roleDto);
    }

    @Get()
    getAll() {
        return this.roleService.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.roleService.getById(_id)
    }

}
