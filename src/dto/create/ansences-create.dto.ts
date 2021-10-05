import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateAbsenceDto {
  @ApiProperty({
    default: 1,
  })
  readonly type: number;
  @ApiProperty({
    default: 1,
    description: 'Absent user',
  })
  readonly person: string;
}
