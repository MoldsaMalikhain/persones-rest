export default class CreatePersonesDto {
  readonly username: string;
  readonly firstname: string;
  readonly age: string;
  readonly nameOnProject: number;
  readonly startDate: number;
  readonly endDate: number;
  readonly englishLvl: number;
  readonly password: string;
  readonly role: string;
  readonly skills: string[];
  readonly persones?: number[];
  readonly managers?: number[];
}
