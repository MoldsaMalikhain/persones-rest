import { ApiProperty } from '@nestjs/swagger';

export default class CreateNotesDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly text: string;
  @ApiProperty()
  readonly user_m?: number;
  @ApiProperty()
  readonly user_p: string;
  // readonly persones?: string[];
}
