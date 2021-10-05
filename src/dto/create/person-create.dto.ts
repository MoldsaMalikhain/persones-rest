import { ApiProperty } from '@nestjs/swagger';

export default class CreatePersonesDto {
  @ApiProperty({ description: 'Unique username for login' })
  readonly username: string;
  @ApiProperty({ description: 'Age of the user' })
  readonly age: string;
  @ApiProperty({ description: 'project id?' })
  readonly nameOnProject: number;
  @ApiProperty({ description: 'English knowledge level' })
  readonly englishLvl: number;
  @ApiProperty({ description: 'Password for login' })
  readonly password: string;
  @ApiProperty({
    description: 'Unique role for user {ADMIN, MANAGER, USER, ALL/GUEST}',
  })
  readonly role: string;
  @ApiProperty({
    description: 'Skill stack of user',
    type: [String],
  })
  readonly skills?: string[];
  @ApiProperty({
    description: 'All notes where user is assigned',
    type: [Number],
  })
  readonly notes?: number[];
  @ApiProperty({
    description: 'User absences',
    type: [Number],
  })
  readonly absences?: number[];
  @ApiProperty({
    description: 'User salaries',
    type: [Number],
  })
  readonly salaries?: number[];
  @ApiProperty({
    description: 'Users assigned to manager',
    type: [Number],
  })
  readonly persones?: number[];
  @ApiProperty({
    description: 'Manager of user',
    type: [Number],
  })
  readonly managers?: number[];
}
