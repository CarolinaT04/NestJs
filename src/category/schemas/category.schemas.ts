import { Schema } from 'mongoose';

export const CategorySchema = new Schema ({
    
    description : { type : String, minlength: 6 , maxlength:30 ,required: [true , "Es necesario un description"]},
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});