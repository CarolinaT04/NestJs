import { Controller,
         Get,
         Post,
         Put, 
         Delete,
         Res, 
         HttpStatus,
         Body,
         Param,
         NotFoundException,
         Query, 
         UseGuards}              from '@nestjs/common';
import { CreateAccountDTO }      from './dto/accounts.dto';
import { AccountsService }       from './accounts.service';
import { JwtAuthGuard }          from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('accounts')
export class AccountsController {

    //Adding the AccountService as a class method
    constructor(private accountService: AccountsService){}


    //The createPost is ejecute when the request Post is called 
    
    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async createPost(@Res()res, @Body() createAccountDTO: CreateAccountDTO){

        const  account = await this.accountService.createAccount(createAccountDTO);
        return res.status(HttpStatus.OK).json({    //If everything is OK , it sends a successfully message and return the data by a JSON

            message: 'Account successfully created',
            account
        });
    }

    //This getAccounts is ejectute when the request Get is called
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getAccounts(@Res() res){

        const accounts = await this.accountService.getAccounts();
        return res.status(HttpStatus.OK).json({                //If everything is OK , it sends a successfully message and return the data by a JSON

            message: 'All Accounts',
            accounts
        });
        
    }

    //This getAccount is ejecute when the request Get is called and it needs an ID to list the data
    @UseGuards(AuthGuard('jwt'))
    @Get('/:accountId')
    async getAccount(@Res() res , @Param('accountId') accountId){

        const account = await this.accountService.getAccount(accountId);
        if(!account) throw new NotFoundException('Account does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({                             //If everything is OK , it sends a successfully message and return the data by a JSON
            message: 'Account successfully found',
            account
        })
    }

    //This deleteAccount is ejecute when the request Delete is called and 
    //It needs an ID to find and delete the account
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete')
    async deleteAccount(@Res() res , @Query('accountId') accountId){
        const account = await this.accountService.deleteAccount(accountId);
        if(!account) throw new NotFoundException('Account does not exists'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({                              //If everything is OK , it sends a successfully message and return the data by a JSON
            message: 'Account deleted successfully',
            account
        });
    }

     //This updateAccount is ejecute when the request Put is called and 
    //It needs an ID to find and update the account
    @UseGuards(AuthGuard('jwt'))
    @Put('/update')
    async updateAccount(@Res() res ,@Body() createAccountDTO: CreateAccountDTO , @Query('accountId') accountId){
        const account = await this.accountService.updateAccount(accountId , createAccountDTO);
        if(!account) throw new NotFoundException('Account does not exists'); // This is a kind of validation... if the ID does not exist the data can be found
        return res.status(HttpStatus.OK).json({                             //If everything is OK , it sends a successfully message and return the data by a JSON
            message: 'Account updated successfully',
            account
        });
    }

}
