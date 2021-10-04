import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateCurrencyRecordsDto {
  @ApiProperty()
  readonly projectSalary: number;
  @ApiProperty()
  readonly bankRate: number;
  @ApiProperty()
  readonly taxRate: number;
  @ApiProperty()
  readonly net: number;
  @ApiProperty()
  readonly month: number;
  @ApiProperty()
  readonly currency: number;
  @ApiProperty()
  readonly company: number;
}
