import { ApiProperty } from '@nestjs/swagger';

export default class CreateSalarysDto {
  @ApiProperty({ description: 'User salary' })
  readonly amount: number;
  @ApiProperty({ description: 'Currency in rotation' })
  readonly currency: number;
  @ApiProperty({ description: 'reciver' })
  readonly person: string;
  @ApiProperty({ description: 'Record of the salary' })
  readonly record: number;
}
