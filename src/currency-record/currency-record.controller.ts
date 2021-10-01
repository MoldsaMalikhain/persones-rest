import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import CreateCurrencyRecordsDto from 'src/dto/create/currency.records-create.dto';
import { CurrencyRecordService } from './currency-record.service';

@Controller('record')
export class CurrencyRecordController {
  constructor(private readonly recordService: CurrencyRecordService) {}

  @Post()
  async create(@Body() dto: CreateCurrencyRecordsDto) {
    return this.recordService.create(dto);
  }

  @Get()
  async getAll() {
    return this.recordService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.recordService.delete(_id);
  }
}
