import { Controller , 
         Get , 
         Post , 
         Put , 
         Delete  , 
         Res , 
         HttpStatus, 
         Body, 
         Param, 
         NotFoundException, 
         Query,
         UseGuards}         from '@nestjs/common';
import { CreateClientDTO }  from './dto/client.dto';
import { ClientService }    from './client.service';
import { JwtAuthGuard }     from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
 
@Controller('client')
export class ClientController {

  //Adding the ClientService as a class method
  constructor( private clientService : ClientService){}

 //The createPost is ejecute when the request Post is called 
 @UseGuards(AuthGuard('jwt'))
 @Post('/create')
 async createPost(@Res() res, @Body() createClientDTO: CreateClientDTO){

    const  client = await this.clientService.creatClient(createClientDTO);
  
    return res.status(HttpStatus.OK).json({   //If everything is OK , it sends a successfully message and return the data by a JSON
         message: 'Client successfully created',
         client:  client
     });
 }

 //This getClient is ejectute when the request Get is called
 @UseGuards(AuthGuard('jwt'))
 @Get('/')
 async getClient(@Res() res){
    const  client = await this.clientService.getClients();
    return res.status(HttpStatus.OK).json({ //If everything is OK , it sends a successfully message and return the data by a JSON
         message: 'All Clients',
         client
     });
 }

 //This getClientById is ejecute when the request Get is called and it needs an ID to list the data
 @UseGuards(AuthGuard('jwt'))
 @Get('/:clientId')
 async getClientById(@Res() res, @Param('clientId') clientId){
    const client = await this.clientService.getClient(clientId); 
    if (!client) throw new NotFoundException('Client Does not exist');//This is a kind of validation... if the ID does not exist the data can be found
    return res.status(HttpStatus.OK).json({                           //If everything is OK , it sends a successfully message and return the data by a JSON
      message: 'Client successfully found',
      client                           
  
 });
 
}

//This deleteClient is ejecute when the request Delete is called and 
//It needs an ID to find and delete the account
@UseGuards(AuthGuard('jwt'))
 @Delete('/delete')
 async deleteClient(@Res() res, @Query('clientId') clientId){

    const client = await this.clientService.deleteClient(clientId); 
    if (!client) throw new NotFoundException('Client Does not exist'); // This is a kind of validation... if the ID does not exist the data can be found
     return res.status(HttpStatus.OK).json({                           //If everything is OK , it sends a successfully message and return the data by a JSON
       message: 'Client deleted successfully',
       client
      });
 }

 @UseGuards(AuthGuard('jwt'))
 @Put('/update')
 async updateClient(@Res() res, @Body() createClientPDO : CreateClientDTO , @Query('clientId') clientId){
    const client = await this.clientService.updateClient(clientId , createClientPDO); 
    if (!client) throw new NotFoundException('Client Does not exist');// This is a kind of validation... if the ID does not exist the data can be found
     return res.status(HttpStatus.OK).json({                          //If everything is OK , it sends a successfully message and return the data by a JSON
       message: 'Client Updated successfully',
       client
      });
 }
}
