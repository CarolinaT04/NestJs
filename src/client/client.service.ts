import { Injectable }    from '@nestjs/common';
import {Model}           from 'mongoose'; //Definir un modelo de datos para consultar cosas 
import {InjectModel}     from '@nestjs/mongoose';
import {Client}          from './interfaces/client.interfaces';
import {CreateClientDTO} from './dto/client.dto'; // Para definir lo que se envie y recibe en la app
 
@Injectable()
export class ClientService {

    constructor(@InjectModel('Client') private readonly clientModel : Model<Client> ){}

    async creatClient(createClientDTO: CreateClientDTO): Promise<Client>{

       const client = new this.clientModel(createClientDTO);
        return await client.save();
   
    }

    async getClients(): Promise<Client[]>{
     const clients =  await this.clientModel.find();
        return clients;

    }

   async getClient( clientId : string ): Promise <Client>{
      const client = await  this.clientModel.findById(clientId);
      return client;


    }

    async updateClient(clientId: string , createClientDTO : CreateClientDTO): Promise<Client>{
        const client = await this.clientModel.findByIdAndUpdate(clientId , createClientDTO , {new: true}); // El new true lo que hace es retornar el el dato con el cambio reciente.
        return client;

    }
   
   async deleteClient(clientId : string): Promise<Client>{
        const client = await this.clientModel.findByIdAndDelete(clientId);
        return client;

    }
}
