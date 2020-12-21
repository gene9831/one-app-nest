import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminService: AdminService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // passport-jwt会自动验证headers里面的Authorization字段, 验证成功后会解密成payload对象
    if (!this.adminService.findOne(payload.username)) {
      throw new UnauthorizedException();
    }
    // 返回值会赋值给req.user，使用@CurrentUser装饰器获取req.user
    return payload;
  }
}
