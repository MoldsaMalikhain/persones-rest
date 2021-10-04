import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import CreateCompaniesDto from 'src/dto/create/company-create.dto';
import { Companies } from 'src/entity/companies.entity';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiBody({ type: CreateCompaniesDto })
  @ApiCreatedResponse({
    description: 'Companies record has been successfully created',
    type: Companies,
  })
  create(@Body() dto: CreateCompaniesDto): Promise<Companies> {
    return this.companyService.create(dto);
  }

  @Get()
  getAll(): Promise<Companies[]> {
    return this.companyService.getAll();
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Companies record has been successfully deleted',
    type: Companies,
  })
  async delete(@Param('id') _id: number): Promise<Companies> {
    return this.companyService.delete(_id);
  }
}
