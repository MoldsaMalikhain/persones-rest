import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger/dist/decorators/api-body.decorator';
import CreateRoleDto from 'src/dto/create/role-create.dto';
import { Role } from 'src/entity/role.entity';
import { RoleService } from './role.service';
@ApiTags('Role')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleServise: RoleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Roles in system' })
  @ApiCreatedResponse({
    description: 'Here is Role which you want to find',
    type: Role,
  })
  async getAll(): Promise<Role[]> {
    return this.roleServise.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crete new Role in system' })
  @ApiCreatedResponse({
    description: 'Role record has been successfully created',
    type: Role,
  })
  @ApiBody({ type: CreateRoleDto })
  async create(@Body() _name: CreateRoleDto): Promise<Role> {
    return this.roleServise.create(_name);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Role from system' })
  @ApiCreatedResponse({
    description: 'Role record has been successfully deleted',
    type: Role,
  })
  async delete(@Param('id') _id: number): Promise<Role> {
    return this.roleServise.delete(_id);
  }
}
