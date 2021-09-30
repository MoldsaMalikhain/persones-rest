export default class CreateSalarysDto {
  readonly amount: number;
  readonly currency: number;
  readonly start_date: number;
  readonly end_date: number;
  readonly person: string;
  readonly record: number;
}
