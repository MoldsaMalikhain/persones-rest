import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import CreateCurrencyDto from 'src/dto/create/currency-create.dto';
import { CurrencyService } from './currency.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  create(@Body() dto: CreateCurrencyDto) {
    return this.currencyService.create(dto);
  }

  @Get()
  getAll() {
    return this.currencyService.getAll();
  }

  @Delete(':id')
  async delete(@Param('id') _id: number) {
    return this.currencyService.delete(_id);
  }
}
