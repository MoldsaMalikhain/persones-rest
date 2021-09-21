/* eslint-disable prettier/prettier */


export default class CreateCurrencyRecordDto {
    readonly projectSallary: number
    readonly bankRate: number;
    readonly taxRate: number;
    readonly net: number;
    readonly month: number;
    readonly operationDate: number;
    // readonly currency: number;
    // readonly company: number;
}