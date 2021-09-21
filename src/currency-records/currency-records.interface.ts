/* eslint-disable prettier/prettier */
export interface CurrencyRecords {
    projectSallary: number
    bankRate: number;
    taxRate: number;
    net: number;
    month: number;
    operationDate: number;
    currency?: number;
    company?: number;
}
export interface CurrencyRecordsRo {
    currency: CurrencyRecords
}
