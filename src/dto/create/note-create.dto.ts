export default class CreateNotesDto {
  readonly name: string;
  readonly date: number;
  readonly text: string;
  readonly user_m?: number;
  readonly persones?: number[];
  readonly user_p: number;
}
