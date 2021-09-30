export interface Salary {
  amount: number;
  start_date: number;
  end_date: number;
  currency: any;
  person: any;
  record: any;
}

export interface SalaryRO {
  salary: Salary;
}
