import { ApiProperty } from '@nestjs/swagger';

export default class CreateSkillsDto {
  @ApiProperty()
  readonly name: string;
}
