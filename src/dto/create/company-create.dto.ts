import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateCompaniesDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly contacts: string;
  @ApiProperty()
  readonly createTime: number;
  // readonly record: number[];
}
