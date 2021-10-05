import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateCurrencyRecordsDto from 'src/dto/create/currency.records-create.dto';
import { CurrencyRecords } from 'src/entity/currency-records.entity';
import { CurrencyRecordService } from './currency-record.service';

@ApiTags('CurrencyRecord')
@Controller('record')
export class CurrencyRecordController {
  constructor(private readonly recordService: CurrencyRecordService) {}

  @Post()
  @ApiOperation({ summary: 'Create CurrencyRecord in system' })
  @ApiBody({ type: CreateCurrencyRecordsDto })
  @ApiCreatedResponse({
    description: 'CurrencyRecords record has been successfully created',
    type: CurrencyRecords,
  })
  async create(
    @Body() dto: CreateCurrencyRecordsDto,
  ): Promise<CurrencyRecords> {
    return this.recordService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all CurrencyRecords in system' })
  @ApiCreatedResponse({
    description: 'Here is CurrencyRecords which you want to find',
    type: CurrencyRecords,
  })
  async getAll(): Promise<CurrencyRecords[]> {
    return this.recordService.getAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete CurrencyRecord from system' })
  @ApiCreatedResponse({
    description: 'CurrencyRecords record has been successfully deleted',
    type: CurrencyRecords,
  })
  async delete(@Param('id') _id: number): Promise<CurrencyRecords> {
    return this.recordService.delete(_id);
  }
}
