import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Salaries } from 'src/entity/salaries.entity';
import { SalaryService } from './salary.service';

@ApiTags('Salary')
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Salary in system' })
  @ApiCreatedResponse({
    description: 'Here is Salaries which you want to find',
    type: Salaries,
  })
  async getAll(): Promise<Salaries[]> {
    return this.salaryService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Salary in system' })
  @ApiCreatedResponse({
    description: 'Here is Salaries which you want to find',
    type: Salaries,
  })
  async getById(@Param('id') _id: number): Promise<Salaries> {
    return this.salaryService.getById(_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Salary from system' })
  @ApiCreatedResponse({
    description: 'Salaries record has been successfully deleted',
    type: Salaries,
  })
  async delete(@Param('id') _id: number): Promise<Salaries> {
    return this.salaryService.delete(_id);
  }
}
