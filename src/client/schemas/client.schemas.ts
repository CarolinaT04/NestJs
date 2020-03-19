import { Schema } from 'mongoose';

export const ClientSchema = new Schema ({
    
    Id          : { type : String, required: true},        
    name        : { type : String, required: true},
    address     : { type : String, required: true},
    civilStatus : { type : String, required: true}, 
    telephone   : { type : String, required: true},
    email       : { type : String, required: true},
    categoryId  : Schema.Types.ObjectId,
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});

