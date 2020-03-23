import {Document} from 'mongoose';

//To manage what is inside the code
export interface Client extends Document {

    readonly Id         : string;
    readonly name       : string;
    readonly estadoCivil: string;
    readonly address    : string;
    readonly email      : string;
    readonly telefono   : string;
    readonly categoryId : string;
    readonly accountId  : string;
    readonly services   : [Service];
  
}

/**
 * This interface generate the structure of the service  for a client.
 * Does a service status refence 
 * 
 */

export interface Service extends Document{

    serviceId : string,
    status    : String
}

