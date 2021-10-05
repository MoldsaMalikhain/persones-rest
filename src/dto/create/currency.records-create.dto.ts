import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateCurrencyRecordsDto {
  @ApiProperty({ description: 'Allocated salaty for position of user' })
  readonly projectSalary: number;
  @ApiProperty({ description: 'Persent of bank' })
  readonly bankRate: number;
  @ApiProperty({ description: 'Tax' })
  readonly taxRate: number;
  @ApiProperty({ description: 'Net profit' })
  readonly net: number;
  @ApiProperty({ description: 'When record has been created' })
  readonly month: number;
  @ApiProperty({ description: 'Currency in rotation' })
  readonly currency: number;
  @ApiProperty({ description: 'Sender/Customer' })
  readonly company: number;
}
