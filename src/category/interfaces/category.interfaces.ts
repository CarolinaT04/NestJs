import {Document} from 'mongoose';

export interface Category extends Document {

    readonly description   : string;
}

//To manage what is inside the code