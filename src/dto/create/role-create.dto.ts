import { ApiProperty } from '@nestjs/swagger';

export default class CreateRoleDto {
  @ApiProperty({ description: 'Unique role name' })
  readonly name: string;
}
