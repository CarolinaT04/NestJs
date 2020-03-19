import { Controller , 
         Get ,
         Post , 
         Put,
         Delete, 
         Res , 
         HttpStatus,
         Body, 
         Param ,
         NotFoundException,
         Query }             from '@nestjs/common';
import { CreateUserDTO}      from './dto/users.dto';
import {UsersService}        from './users.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('users')
export class UsersController {

    constructor( private userService : UsersService){}
/*
    @Post('/create')
    async createPost(@Res() res , @Body() createUserDTO : CreateUserDTO){
        const user = await this.userService.createUser(createUserDTO);

        return res.status(HttpStatus.OK).json({

            message: 'User successfully created',
            user
        });
    }
  
        @Get('/')
        async getUser(@Res() res ){
        const user = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({

            message: 'All Users',
            user
        });
        }
          */
    
        @Get('/:username')
        async findUser(@Res() res , @Param('username')username){
            const user = await this.userService.findOne(username);
            if(!user) throw new NotFoundException('User does not exists');
            return res.status(HttpStatus.OK).json({
                message: 'User found successfully',
                user

            });
        }

        /*
        @Delete('/delete')
        async deleteUser(@Res() res , @Query('userId') userId){
            const user = await this.userService.deleteUser(userId);
            if(!user) throw new NotFoundException('User does not exists');
            return res.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                user
            }) 
        }
            @Put('/update')
            async updateUser(@Res() res , @Body() createUserDTO :CreateUserDTO , @Query('userId') userId){
               const user = await this.userService.updateUser(userId , createUserDTO);
               if (!user) throw new NotFoundException('User does not exists');
               return res.status(HttpStatus.OK).json({
                   message: 'User updated successfully',
                   user
               });
            }
            */
        
}
