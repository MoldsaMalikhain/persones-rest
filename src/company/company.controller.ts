import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateCompaniesDto from 'src/dto/create/company-create.dto';
import { Companies } from 'src/entity/companies.entity';
import { CompanyService } from './company.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Create Company in system' })
  @ApiBody({ type: CreateCompaniesDto })
  @ApiCreatedResponse({
    description: 'Companies record has been successfully created',
    type: Companies,
  })
  create(@Body() dto: CreateCompaniesDto): Promise<Companies> {
    return this.companyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Companeis in system' })
  @ApiCreatedResponse({
    description: 'Here is Companies which you want to find',
    type: Companies,
  })
  getAll(): Promise<Companies[]> {
    return this.companyService.getAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Company from system' })
  @ApiCreatedResponse({
    description: 'Companies record has been successfully deleted',
    type: Companies,
  })
  async delete(@Param('id') _id: number): Promise<Companies> {
    return this.companyService.delete(_id);
  }
}
