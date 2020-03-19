import { Module }           from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService }    from './client.service';
import { MongooseModule}    from '@nestjs/mongoose';
import { ClientSchema }    from './schemas/client.schemas';
@Module({
  imports    : [
   MongooseModule.forFeature([
     {name   : 'Client' , 
      schema : ClientSchema }  //Conexion con mongo db mediante schemas 
   ])
  ],
  controllers:   [ClientController],
  providers  :   [ClientService]
})
export class ClientModule {}
