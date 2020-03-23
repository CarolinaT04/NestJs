import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from './jwt.strategy';
import { UsersModule }    from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { Module }         from '@nestjs/common';
import { JwtModule }      from '@nestjs/jwt';
import { jwtConstants }   from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '1hr'
      }
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy , LocalStrategy]
})
export class AuthModule {}