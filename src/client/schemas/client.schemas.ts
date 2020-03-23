import { Schema } from 'mongoose';

const ServiceSchema = new Schema ({

    serviceId : Schema.Types.ObjectId,
    status : {type: String , minlength:6 , maxlength:30, default: "Inicializado", 
             enum: ['Pendiente','En_Estudio','Aprovado','Rechazado'] , 
             required: true}
});

export const ClientSchema = new Schema ({
    
    Id          : { type : String,  minlength:9 , maxlength:20 ,required:  [true , "Es necesario un Id"]},        
    name        : { type : String,  minlength:6 , maxlength:50  ,required: [true , "Es necesario un name"]},
    address     : { type : String,  minlength:6 , maxlength:100 ,required: [true , "Es necesario un address"]},
    civilStatus : { type : String,  minlength:6 , maxlength:30  ,required: [true , "Es necesario un civilStatus"]}, 
    telephone   : { type : String,  minlength:8 , maxlength:30  ,required: [true , "Es necesario un telephone"]},
    email       : { type : String,  minlength:10, maxlength:50  ,unique: true ,required: [true , "Es necesario un email"]},
    categoryId  : Schema.Types.ObjectId,
    accountId   : Schema.Types.ObjectId,
    services    : [ServiceSchema],
    createdAt   : {
        type    : Date ,
        default : Date.now
    }

});

