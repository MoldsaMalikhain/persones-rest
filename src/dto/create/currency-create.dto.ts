import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateCurrencyDto {
  @ApiProperty({ description: 'Name of the currency' })
  readonly name: string;
  @ApiProperty({ description: 'Currency rate' })
  readonly rate: number;
  @ApiProperty({ description: 'Symbol of the currency' })
  readonly symbol: string;
  // readonly salaries: number[];
  // readonly records: number[];
}
