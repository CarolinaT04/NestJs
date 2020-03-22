import {Document} from 'mongoose';

//To manage what is inside the code
export interface Service extends Document {

    readonly description   : string;
}

