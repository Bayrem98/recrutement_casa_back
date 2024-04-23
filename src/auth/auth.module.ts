import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { CurrentUserInterceptor } from './user.interceptor';
import { JwtModule } from '@nestjs/jwt';

export const jwtConstants = {
  secret: 'g§ueve45u§eyvZeicne',
};

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 * 8 + 's' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CurrentUserInterceptor],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
