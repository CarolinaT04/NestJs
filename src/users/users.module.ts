
import { Module }          from '@nestjs/common';
import { UsersService }    from './users.service';
import { UserSchema }      from './schemas/users.schemas';
import { MongooseModule }  from '@nestjs/mongoose';
import { UsersController } from './users.controller';

@Module({
  imports     : [
    MongooseModule.forFeature([
      {name   : 'User' , //Collection
       schema : UserSchema }  //To conect with MongoDB by Schemas
    ])
   ],
  providers  : [UsersService],
  exports    : [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}