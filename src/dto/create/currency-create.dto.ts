import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateCurrencyDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly rate: number;
  @ApiProperty()
  readonly symbol: string;
  // readonly salaries: number[];
  // readonly records: number[];
}
