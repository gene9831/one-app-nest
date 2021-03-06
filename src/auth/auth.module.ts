import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalAdminStrategy } from './local-admin.strategy';
import { AdminModule } from 'src/admin/admin.module';
import { AuthResolver } from './auth.resolver';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('jwtSecret'),
          signOptions: { expiresIn: '3600s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AuthResolver, LocalAdminStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
