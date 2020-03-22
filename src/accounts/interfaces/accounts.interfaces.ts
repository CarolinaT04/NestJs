import {Document} from 'mongoose';

//To manage what is inside the code
export interface Account extends Document {

    readonly description   : string;
}

