import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export default class CreateCompaniesDto {
  @ApiProperty({
    description: 'Name of the company',
  })
  readonly name: string;
  @ApiProperty({
    description:
      'Contacts of the company, such as contact phonenumber or email',
  })
  readonly contacts: string;
  @ApiProperty({ description: 'Date when record has been created' })
  readonly createTime: number;
  // readonly record: number[];
}
