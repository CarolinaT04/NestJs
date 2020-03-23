import { Schema } from "mongoose";


export const AccountSchema = new Schema ({
    
    description : { type : String,  minlength:6 , maxlength:50, required: [true , "Es necesario un description"],},
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});