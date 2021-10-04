import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateAbsenceDto {
  @ApiProperty()
  readonly type: number;
  @ApiProperty()
  readonly person: string;
}
