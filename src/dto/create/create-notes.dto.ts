/* eslint-disable prettier/prettier */


export default class CreateNotesDto {
    readonly name: string;
    readonly date: number;
    readonly user_m?: number;
    readonly user_p?: number;
}