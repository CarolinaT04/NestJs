import { Module }             from '@nestjs/common';
import { ServicesService }    from './services.service';
import { ServicesController } from './services.controller';
import { MongooseModule }     from '@nestjs/mongoose';
import { ServiceSchema }      from './schemas/services.schemas';

@Module({
  imports     : [
    MongooseModule.forFeature([
      {name   : 'Service' , //Collection
       schema : ServiceSchema }  //To conect to MongoDB by the Schemas
    ])
   ],
  providers  : [ServicesService],
  controllers: [ServicesController]
})
export class ServicesModule {}
