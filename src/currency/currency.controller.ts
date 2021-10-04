import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import CreateCurrencyDto from 'src/dto/create/currency-create.dto';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiBody({ type: CreateCurrencyDto })
  @ApiCreatedResponse({
    description: 'Currencies record has been successfully created',
    type: Currencies,
  })
  create(@Body() dto: CreateCurrencyDto): Promise<Currencies> {
    return this.currencyService.create(dto);
  }

  @Get()
  getAll(): Promise<Currencies[]> {
    return this.currencyService.getAll();
  }

  @Delete(':id')
  @ApiCreatedResponse({
    description: 'Currencies record has been successfully deleted',
    type: Currencies,
  })
  async delete(@Param('id') _id: number): Promise<Currencies> {
    return this.currencyService.delete(_id);
  }
}
