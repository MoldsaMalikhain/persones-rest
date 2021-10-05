import { ApiProperty } from '@nestjs/swagger';

export default class CreateSkillsDto {
  @ApiProperty({ description: 'Unique skill name' })
  readonly name: string;
}
