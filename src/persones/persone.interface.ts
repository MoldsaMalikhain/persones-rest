/* eslint-disable prettier/prettier */
export interface Persone {
    firstName: string,
    age: string,
    nameOnProject: number;
    startDate: number;
    endDate: number;
    englishLvl: number;
    token: any;
    skills?: number[];
    notes?: number[];
    absences?: number[];
    salaries?: number[];
    persones?: number[];
    managers?: number[];
    roles?: number;
}

export interface PersoneRO {
    persone: Persone;
}
