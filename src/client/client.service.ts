import { Injectable }    from '@nestjs/common';
import {Model}           from 'mongoose'; //To Define a data model to query data
import {InjectModel}     from '@nestjs/mongoose';
import {Client}          from './interfaces/client.interfaces';
import {Service}         from './interfaces/client.interfaces';
import {CreateClientDTO} from './dto/client.dto'; // To define what is sent and received in the app
 
@Injectable()
export class ClientService {

private readonly serviceModel : Model<Service>;

    constructor(@InjectModel('Client') private readonly clientModel : Model<Client> ){}

    //This method create the category.
    //The async and await are used because mongoose does asynchronous queries
    async creatClient(createClientDTO: CreateClientDTO): Promise<Client>{

       const client = new this.clientModel(createClientDTO);
       
        return await client.save();
   
    }

   //This method fin one category by the ID
   async getClient( clientId : string ): Promise <Client>{
      const client = await  this.clientModel.findById(clientId);
      return client;


    }
    //This is an aggregation that list all the clients with the categories name
    async getCategory(): Promise<any> {
        const results = await this.clientModel.aggregate([
            {
                $lookup: {
                    as: "uCategory",
                    foreignField: "_id",
                    from: "categories",
                    localField: "categoryId"
                }
            },
            {
                $unwind: "$uCategory"
            },
        ]);
        console.log(results);
        return results;
    }

    //This method update a specific client by the ID
    //The new true what it does is return the data with the recent change.
    async updateClient(clientId: string , createClientDTO : CreateClientDTO): Promise<Client>{
        const  client = await this.clientModel.findByIdAndUpdate(clientId , createClientDTO , {new: true}); 
        return client;

    }

    //This method delete the Client by the ID
   async deleteClient(clientId : string): Promise<Client>{
        const  client = await this.clientModel.findByIdAndDelete(clientId);
        return client;

    }
}
