/* eslint-disable prettier/prettier */
export interface Person {
  username: string;
  age: string;
  nameOnProject: number;
  englishLvl: number;
  // token: any;
  // skills?: number[];
  // notes?: number[];
  // absences?: number[];
  // salaries?: number[];
  // persones?: number[];
  // managers?: number[];
  // roles?: number;
}

export interface PersonRO {
  person: Person;
}
