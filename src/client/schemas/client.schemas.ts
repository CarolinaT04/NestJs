import { Schema } from 'mongoose';

const ServiceSchema = new Schema ({

    serviceId : Schema.Types.ObjectId,
    status : {type: String ,default: "INITIALIZED", required: true}
});

export const ClientSchema = new Schema ({
    
    Id          : { type : String, minlength:9  , maxlength:20  ,required: true},        
    name        : { type : String,  minlength:6 , maxlength:50  ,required: true},
    address     : { type : String,  minlength:6 , maxlength:100 ,required: true},
    civilStatus : { type : String,  minlength:6 , maxlength:20  ,required: true}, 
    telephone   : { type : String,  minlength:8 , maxlength:20  ,required: true},
    email       : { type : String,  minlength:10, maxlength:50  ,required: true},
    categoryId  : Schema.Types.ObjectId,
    accountId   : Schema.Types.ObjectId,
    services    : [ServiceSchema],
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});

