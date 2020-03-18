import { Schema } from 'mongoose';

export const ClienteSchema = new Schema ({
    
    name        : { type : String, required: true},
    address     : { type : String, required: true},
    civilStatus : { type : String, required: true}, 
    telephone   : { type : String, required: true},
    email       : { type : String, required: true},
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});