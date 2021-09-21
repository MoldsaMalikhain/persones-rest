/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateCurrenciesDto from '../dto/create/create-currencies.dto';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
export class CurrenciesController {

    constructor(private readonly currencyServise: CurrenciesService) { }

    @Post()
    create(@Body() currencyDto: CreateCurrenciesDto) {
        return this.currencyServise.create(currencyDto);
    }

    @Get()
    getAll() {
        return this.currencyServise.getAll();
    }

    @Get(':id')
    getById(@Param('id') _id: number) {
        return this.currencyServise.getById(_id);
    }



}
