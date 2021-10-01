import { Controller, Delete, Get, Param } from '@nestjs/common';
import { SalaryService } from './salary.service';

@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  async getAll() {
    return this.salaryService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') _id: number) {
    return this.salaryService.getById(_id);
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.salaryService.delete(_id);
  }
}
