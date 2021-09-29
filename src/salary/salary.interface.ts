export interface Salary {
  amount: number;
  currency: number[];
  start_date: number;
  end_date: number;
  person: number;
  record: number;
}

export interface SalaryRO {
  salary: Salary;
}
