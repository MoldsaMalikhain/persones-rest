/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateCurrencyRecordDto from '../dto/create/create-currency-records.dto';
import { CurrencyRecordsService } from './currency-records.service';

@Controller('currency-records')
export class CurrencyRecordsController {

    constructor(private readonly currencyRecordService: CurrencyRecordsService) { }

    @Post()
    create(@Body() currencyRecDto: CreateCurrencyRecordDto) {
        return this.currencyRecordService.create(currencyRecDto);
    }

    @Get()
    getAll() {
        return this.currencyRecordService.getAll()
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.currencyRecordService.getById(_id);
    }

}
