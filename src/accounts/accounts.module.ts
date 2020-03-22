import { Module }             from '@nestjs/common';
import { AccountsService }    from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule }     from '@nestjs/mongoose';
import { AccountSchema }      from './schemas/accounts.schemas';

@Module({
  imports     : [
    MongooseModule.forFeature([
      {name   : 'Account' ,      //Collection
       schema : AccountSchema }  //Conexion con mongodb mediante schemas 
    ])
   ],
  providers  : [AccountsService],
  controllers: [AccountsController]
})
export class AccountsModule {}
