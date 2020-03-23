
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService }                      from '../users/users.service';
import { JwtService }                        from '@nestjs/jwt';
import {  User }                             from 'src/users/interfaces/users.interfaces';
import { LoginUserDto }                      from './interfaces/login.interfaces';
import { JwtPayload }                        from './interfaces/jwt-payload.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {

    // This will be used for the initial login
    const userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
    
    return new Promise((resolve) => {

        // Check the supplied password against the hash stored for this email address
        userToAttempt.checkPassword(loginAttempt.password, (err, isMatch) => {

            if(err) throw new UnauthorizedException();

            if(isMatch){  // If there is a successful match:
               
                resolve(this.createJwtPayload(userToAttempt)); // generate a JWT for the user

            } else {
                throw new UnauthorizedException(); //If there is not a successful match ... it fails
            }

        });

    });

}

        //This a method to validate the user by the generate JWT    
        async validateUserByJwt(payload: JwtPayload) { 

            // This will be used when the user has already logged in and has a JWT
            const user = await this.usersService.findOneByEmail(payload.email);

            if(user){

                return this.createJwtPayload(user);

            } else {
                throw new UnauthorizedException();
            }

        }

        createJwtPayload(user){

            const data: JwtPayload = {
                email: user.email
            };

            const jwt = this.jwtService.sign(data);

            return {
                
                //Here are what user is gonna see when they successfully match
                expiresIn: '1hr',   
                token: jwt            
            }

        }

}