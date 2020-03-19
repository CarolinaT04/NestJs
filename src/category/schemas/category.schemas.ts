import { Schema } from 'mongoose';

export const CategorySchema = new Schema ({
    
    description : { type : String, required: true},
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});