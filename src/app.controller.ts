import { Controller, Post , Request , UseGuards , Get } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService }   from './auth/auth.service';

@Controller()
export class AppController {
  constructor() {}

  //Login 
/*
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req ){
    return this.authService.login(req.user);
  }
*/
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async getProfile(@Request() req ){
    return req.user;
  }

}
