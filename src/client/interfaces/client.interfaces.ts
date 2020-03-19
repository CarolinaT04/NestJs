import {Document} from 'mongoose';

export interface Client extends Document {

    readonly Id         : string;
    readonly name       : string;
    readonly estadoCivil: string;
    readonly address    : string;
    readonly email      : string;
    readonly telefono   : string;
    readonly categoryId : string;
}

//Para manejar lo que esta dentro del codigo