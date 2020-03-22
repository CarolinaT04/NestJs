import { Schema } from 'mongoose';

export const CategorySchema = new Schema ({
    
    description : { type : String, minlength: 6 , maxlength: 20,required: true},
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});