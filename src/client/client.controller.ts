import { Controller , Get , Post , Put , Delete  , Res , HttpStatus, Body, Param, NotFoundException, Query} from '@nestjs/common';
import { CreateClientDTO }                                                 from './dto/client.dto';
import {ClientService} from './client.service';
 
@Controller('client')
export class ClientController {

  constructor( private clientService : ClientService){}

 @Post('/create')
 async createPost(@Res() res, @Body() createClientDTO: CreateClientDTO){
    const client = await this.clientService.creatClient(createClientDTO);
  
    return res.status(HttpStatus.OK).json({
         message: 'Client successfully created',
         client:  client
     });
 }

 @Get('/')
 async getClient(@Res() res){
    const client = await this.clientService.getClients();
    return res.status(HttpStatus.OK).json({
         message: 'All Clients',
         client
     });
 }

 @Get('/:clientId')
 async getClientById(@Res() res, @Param('clientId') clientId){
    const client = await this.clientService.getClient(clientId); 
    if (!client) throw new NotFoundException('Product Does not exists');
     return res.status(HttpStatus.OK).json(client);
 }

 @Delete('/delete')
 async deleteClient(@Res() res, @Query('clientId') clientId){
    const client = await this.clientService.deleteClient(clientId); 
    if (!client) throw new NotFoundException('Client Does not exists');
     return res.status(HttpStatus.OK).json({
       message: 'Client deleted successfully',
       client
      });
 }

 @Put('/update')
 async updateClient(@Res() res, @Body() createClientPDO : CreateClientDTO , @Query('clientId') clientId){
    const client = await this.clientService.updateClient(clientId , createClientPDO); 
    if (!client) throw new NotFoundException('Client Does not exists');
     return res.status(HttpStatus.OK).json({
       message: 'Client Updated successfully',
       client
      });
 }
}
