import {Document} from 'mongoose';

export interface Category extends Document {

    readonly description   : string;
}

//Para manejar lo que esta dentro del codigo