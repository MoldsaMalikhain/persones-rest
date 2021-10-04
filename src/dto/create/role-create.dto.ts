import { ApiProperty } from '@nestjs/swagger';

export default class CreateRoleDto {
  @ApiProperty()
  readonly name: string;
}
