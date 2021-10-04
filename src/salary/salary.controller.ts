import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Salaries } from 'src/entity/salaries.entity';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  async getAll(): Promise<Salaries[]> {
    return this.salaryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') _id: number): Promise<Salaries> {
    return this.salaryService.getById(_id);
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Salaries record has been successfully deleted',
    type: Salaries,
  })
  async delete(@Param('id') _id: number): Promise<Salaries> {
    return this.salaryService.delete(_id);
  }
}
