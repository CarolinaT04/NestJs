import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './interfaces/users.interfaces';
import {CreateUserDTO} from './dto/users.dto';


@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel : Model<User>){}
/*
        async createUser (createUserDTO: CreateUserDTO): Promise<User>{

            const users = new this.userModel(createUserDTO);
            return await users.save();
        }

        async getUsers(): Promise<User[]>{
            
            const users = await this.userModel.find();
            return users;
        }
    */

        async findOne(username: string) : Promise<User | undefined>{

            const user = this.userModel.find(users => user.username == username);
            return user;
            
        }
/*
        async updateUser( userId : string , createUserDTO: CreateUserDTO): Promise<User>{

            const user = await this.userModel.findByIdAndUpdate( userId , createUserDTO , {new : true});
            return user;
        }

        async   deleteUser (userId : string) : Promise<User>{

            const user = await this.userModel.findByIdAndDelete(userId);
            return user;
        }
        */
}    


