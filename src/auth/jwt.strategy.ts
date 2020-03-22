import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy }              from 'passport-jwt';
import { AuthService }                       from './auth.service';
import { PassportStrategy }                  from '@nestjs/passport';
import { JwtPayload }                        from './interfaces/jwt-payload.interfaces';
import { jwtConstants }                      from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            
            secretOrKey: jwtConstants.secret,   //Secret key
        });

    }

   //This method validate the
    async validate(payload: JwtPayload){

        const user = await this.authService.validateUserByJwt(payload);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;

    }

}