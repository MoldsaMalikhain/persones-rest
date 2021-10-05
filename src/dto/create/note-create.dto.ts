import { ApiProperty } from '@nestjs/swagger';

export default class CreateNotesDto {
  @ApiProperty({ description: 'Name of the note' })
  readonly name: string;
  @ApiProperty({ description: 'Note guts' })
  readonly text: string;
  @ApiProperty({ description: 'Note creator' })
  readonly user_m?: number;
  @ApiProperty({ description: 'Note resiver' })
  readonly user_p: string;
  // readonly persones?: string[];
}
