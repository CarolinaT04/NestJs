import { Injectable }    from '@nestjs/common';
import { InjectModel }   from '@nestjs/mongoose';
import { Model }         from 'mongoose';
import { User }          from './interfaces/users.interfaces';
import { CreateUserDTO } from './dto/users.dto';

@Injectable()
export class UsersService {

constructor(@InjectModel('User') private readonly userModel: Model<User>){}  


 //This method create the user
  async createUser( createUserDTO :CreateUserDTO): Promise<User>{

    const user = new this.userModel(createUserDTO);
    return await user.save();
  }

  //This method list all the users
  async getUsers(): Promise<User[]>{

    const users = await this.userModel.find();
    return users;
  }
  
 //This method is for find the user bye the Email 
 //And it is for the validation  
  async findOneByEmail(email): Promise<User> {

    return await this.userModel.findOne({email: email});

  }
  
}