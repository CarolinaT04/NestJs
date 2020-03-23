import { Injectable }        from '@nestjs/common';
import { Model }             from 'mongoose';
import { InjectModel }       from '@nestjs/mongoose'; //This import helps to create the model based on  the AccountSchema
import { Account }           from './interfaces/accounts.interfaces';
import { CreateAccountDTO }  from './dto/accounts.dto';
import { MongoObjectID, strToMongoObjectID } from 'src/util/commons';

@Injectable()
export class AccountsService {
 
    //Create the constructor of the AccountService class and pass the injectModel parameter for the model.
    constructor(@InjectModel('Account') private readonly accountModel : Model<Account>){}

    //This method create the account.
    //The async and await are used because mongoose does asynchronous queries
    async createAccount( createAccountDTO :CreateAccountDTO): Promise<Account>{

        const account = new this.accountModel(createAccountDTO);
        return await account.save();
    }

    //This method find all the accounts 
    async getAccounts(): Promise<Account[]>{

        const  accounts = await this.accountModel.find();
        return accounts;
    }

    //This method find one account by the ID
    async getAccount(_id: string | MongoObjectID): Promise<Account>{

        const  accounts = await this.accountModel.findById 
                                                ({ _id: typeof _id === "string" ?                               
                                                strToMongoObjectID(_id) : _id });
        return accounts;
    }

    //This method update a specific account by the ID
    // The {new: true} get the new updated data
    async updateAccount(_id: string, createAccountDTO: CreateAccountDTO): Promise<Account>{

        const  accounts = await this.accountModel.findByIdAndUpdate 
                                                    ({ _id: typeof _id === "string" ?                               
                                                    strToMongoObjectID(_id) : _id} , 
                                                    createAccountDTO, {new : true});
        return accounts;
    }

    //This method delete the account by the ID
    async deleteAccount(_id: string | MongoObjectID): Promise<Account>{

        const  accounts = await this.accountModel.findByIdAndDelete 
                                                    ({ _id: typeof _id === "string" ?                               
                                                    strToMongoObjectID(_id) : _id });
        return accounts;
    }
}
