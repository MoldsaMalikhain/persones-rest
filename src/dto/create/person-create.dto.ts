import { ApiProperty } from '@nestjs/swagger';

export default class CreatePersonesDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly age: string;
  @ApiProperty()
  readonly nameOnProject: number;
  @ApiProperty()
  readonly englishLvl: number;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly role: string;
  @ApiProperty({ type: [String] })
  readonly skills?: string[];
  @ApiProperty({ type: [Number] })
  readonly notes?: number[];
  @ApiProperty({ type: [Number] })
  readonly absences?: number[];
  @ApiProperty({ type: [Number] })
  readonly salaries?: number[];
  @ApiProperty({ type: [Number] })
  readonly persones?: number[];
  @ApiProperty({ type: [Number] })
  readonly managers?: number[];
}
