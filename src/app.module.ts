import { Module }          from '@nestjs/common';
import { AccountsModule }  from './accounts/accounts.module';
import { ServicesModule }  from './services/services.module';
import { AppController }   from './app.controller';
import { CategoryModule }  from './category/category.module';
import { AuthModule }      from './auth/auth.module';
import { UsersModule }     from './users/users.module';
import { AppService }      from './app.service';
import { ClientModule }    from './client/client.module';
import { MongooseModule }  from '@nestjs/mongoose';


@Module({
  imports: [
    ClientModule ,
    MongooseModule.forRoot('mongodb://localhost/client-nest', {  // Database route
  useNewUrlPatser: true
         }),
    CategoryModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    ServicesModule],
  controllers : [AppController],
  providers   :   [AppService]

})
export class AppModule {}
