import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { MongooseModule} from '@nestjs/mongoose';
import {ClienteSchema}  from './schemas/client.schemas';
@Module({
  imports : [
   MongooseModule.forFeature([
    {name : 'Client' , schema: ClienteSchema}  //Conexion con mongo db medinate schemas 
   ])
  ],
  controllers: [ClientController],
  providers: [ClientService]
})
export class ClientModule {}
