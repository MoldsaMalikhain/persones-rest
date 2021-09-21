/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import UpdateRolesDto from 'src/dto/update/update-roles.dto';
import CreateRolesDto from '../dto/create/create-roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

    constructor(private readonly roleService: RolesService) { }

    @Post()
    create(@Body() roleDto: CreateRolesDto) {
        return this.roleService.inject(roleDto);
    }

    @Patch(':id')
    update(@Param('id') _id: number, @Body() dto: UpdateRolesDto) {
        return this.roleService.update(_id, dto)
    }

    @Get()
    getAll() {
        return this.roleService.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.roleService.getById(_id)
    }

    @Delete(':id')
    delete(@Param('id') _id: number) {
        return this.roleService.delete(_id);
    }

}
