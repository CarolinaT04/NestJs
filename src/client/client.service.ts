import { Injectable }         from '@nestjs/common';
import {Model}                from 'mongoose'; //To Define a data model to query data
import {InjectModel}          from '@nestjs/mongoose';
import {Client}               from './interfaces/client.interfaces';
import {CreateClientDTO}      from './dto/client.dto'; // To define what is sent and received in the app
import { strToMongoObjectID } from '../util/commons';
import { MongoObjectID }      from '../util/commons';

 
@Injectable()
export class ClientService {


    constructor(@InjectModel('Client') private readonly clientModel : Model<Client> ){}

    //This method create the category.
    //The async and await are used because mongoose does asynchronous queries
    async creatClient(createClientDTO: CreateClientDTO): Promise<Client>{

       const client = new this.clientModel(createClientDTO);
       
        return await client.save();
   
    }

    //This is an aggregation that list all the clients with the category name , account name and the service name
    async getClients(): Promise<any> {
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
            {
                $lookup: {
                    as          : "uAccount",
                    foreignField: "_id",
                    from        : "accounts",
                    localField  : "accountId"
                }
            },
            {
                $unwind: "$uAccount"
            },
            {
                $lookup: {
                    as          : "uService",
                    foreignField: "_id",
                    from        : "services",
                    localField  : "services.serviceId"
                }
            },
            {
                $unwind: "$uAccount"
            },
        ]);
        console.log(results);
        return results;
    }

    //This is an aggregation that list one client by the ID with the category name ,
    // account name and the service name
    async getClient(clientId: string): Promise<any> {
        const results = await this.clientModel.aggregate([
            {
                $match: { $and: [{ _id: strToMongoObjectID(clientId) }] }
            },
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
            {
                $lookup: {
                    as          : "uAccount",
                    foreignField: "_id",
                    from        : "accounts",
                    localField  : "accountId"
                }
            },
            {
                $unwind: "$uAccount"
            },
            {
                $lookup: {
                    as          : "uService",
                    foreignField: "_id",
                    from        : "services",
                    localField  : "services.serviceId"
                }
            },
            {
                $unwind: "$uAccount"
            },
        ]);
        console.log(results);
        return results;
    }
    //This method update a specific client by the ID
    //The new true what it does is return the data with the recent change.
    async updateClient(_id: string | MongoObjectID, createClientDTO : CreateClientDTO): Promise<Client>{
        const  client = await this.clientModel.findByIdAndUpdate
                                                ({ _id: typeof _id === "string" ?                               
                                                strToMongoObjectID(_id) : _id } , 
                                                createClientDTO , {new: true}); 
        return client;

    }

    //This method delete the Client by the ID
   async deleteClient(_id : string): Promise<Client>{
        const  client = await this.clientModel.findByIdAndDelete
                                              ({ _id: typeof _id === "string" ? 
                                               strToMongoObjectID(_id) : _id });
        return client;

    }
}
