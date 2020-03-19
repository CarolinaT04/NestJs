import { Injectable } from '@nestjs/common';
import {UsersService} from '../users/users.service';
import { JwtService} from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private userUservice: UsersService ,
        private jwtService : JwtService
         ){}

         //Validate user with the username and password 

    async validateUser( username : string , pass: string ): Promise<any>{

        const user = await this.userUservice.findOne(username);
        if( user && user.password == pass){
             const { password , ... result} = user ;
             return result;
        }
    
        return null;
    }

    //Login 

    async login (user : any){
        const payload = { username : user.username , sub: user.userId};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    
}
