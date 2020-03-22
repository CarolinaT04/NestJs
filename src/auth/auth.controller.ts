import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './interfaces/login.interfaces'
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }


    @Post() 
    async login(@Body() loginUserDto: LoginUserDto){
        return await this.authService.validateUserByPassword(loginUserDto);
    }

}