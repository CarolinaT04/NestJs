
import { Strategy }                          from 'passport-local';
import { PassportStrategy }                  from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService }                       from './auth.service';
import { User }                              from 'src/users/interfaces/users.interfaces';
import { JwtPayload }                        from './interfaces/jwt-payload.interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(payload: JwtPayload){

    const user = await this.authService.validateUserByJwt(payload);

    if(!user){
        throw new UnauthorizedException();
    }

    return user;

}
}