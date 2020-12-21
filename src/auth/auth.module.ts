import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalAdminStrategy } from './local-admin.strategy';
import { AdminModule } from 'src/admin/admin.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, AuthResolver, LocalAdminStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
