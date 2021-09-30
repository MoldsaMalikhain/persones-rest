import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import CreateCompaniesDto from 'src/dto/create/company-create.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() dto: CreateCompaniesDto) {
    return this.companyService.create(dto);
  }

  @Get()
  getAll() {
    return this.companyService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.companyService.delete(_id);
  }
}
