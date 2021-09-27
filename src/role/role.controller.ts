import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import CreateRoleDto from 'src/dto/create/role-create.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleServise: RoleService) {}

  @Get()
  async getAll() {
    return this.roleServise.findAll();
  }

  @Post()
  async create(@Body() _name: CreateRoleDto) {
    return this.roleServise.create(_name);
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.roleServise.delete(_id);
  }
}
