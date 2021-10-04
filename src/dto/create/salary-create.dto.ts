import { ApiProperty } from '@nestjs/swagger';

export default class CreateSalarysDto {
  @ApiProperty()
  readonly amount: number;
  @ApiProperty()
  readonly currency: number;
  @ApiProperty()
  readonly person: string;
  @ApiProperty()
  readonly record: number;
}
