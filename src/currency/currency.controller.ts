import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateCurrencyDto from 'src/dto/create/currency-create.dto';
import { Currencies } from 'src/entity/currencies.entity';
import { CurrencyService } from './currency.service';

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({ summary: 'Create Currency in system' })
  @ApiBody({ type: CreateCurrencyDto })
  @ApiCreatedResponse({
    description: 'Currencies record has been successfully created',
    type: Currencies,
  })
  create(@Body() dto: CreateCurrencyDto): Promise<Currencies> {
    return this.currencyService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Currencies in system' })
  @ApiCreatedResponse({
    description: 'Here is Currencies which you want to find',
    type: Currencies,
  })
  getAll(): Promise<Currencies[]> {
    return this.currencyService.getAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Currency from system' })
  @ApiCreatedResponse({
    description: 'Currencies record has been successfully deleted',
    type: Currencies,
  })
  async delete(@Param('id') _id: number): Promise<Currencies> {
    return this.currencyService.delete(_id);
  }
}
