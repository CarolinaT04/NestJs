import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule}    from '@nestjs/mongoose';
import { UserSchema }    from './schemas/users.schemas';

@Module({
  imports     : [
    MongooseModule.forFeature([
      {name   : 'User' , 
       schema : UserSchema }  //Conexion con mongo db mediante schemas 
    ])
   ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
