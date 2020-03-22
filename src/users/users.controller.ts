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


@Controller('users')
export class UsersController {

    constructor( private userService : UsersService){}

    //The createPost is ejecute when the request Post is called
    @Post('/create')
    async createPost(@Res() res , @Body() createUserDTO : CreateUserDTO){
        const user = await this.userService.createUser(createUserDTO);

        return res.status(HttpStatus.OK).json({   //If everything is OK ,  it sends a successfully message and return the data by a JSON
            message: 'User successfully created',
            user
        });
    }
  
    //This getUser is ejectute when the request Get is called.
    //List all the users
        @Get('/')
        async getUser(@Res() res ){
        const user = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({  //If everithin is OK, it sends a successfully message and return the data by a JSON
            message: 'All Users',
            user
        });
        }
          
    //This findUser is ejecute when the request Get is called with the parameter email
        @Get('/:email')
        async findUser(@Res() res , @Param('email') email){
            const user = await this.userService.findOneByEmail(email);
            if(!user) throw new NotFoundException('User does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
            return res.status(HttpStatus.OK).json({                      //If everithin is OK, it sends a successfully message and return the data by a JSON
                message: 'User found successfully',
                user

            });
        }
        
        
}
