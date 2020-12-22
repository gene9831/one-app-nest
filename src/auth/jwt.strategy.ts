import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // passport-jwt会自动验证headers里面的Authorization字段, 验证成功后会解密成payload对象
    // 返回值会赋值给req.user，使用@CurrentUser装饰器获取req.user
    const { iat, exp, sub, ...others } = payload;
    return { _id: payload.sub, ...others };
  }
}
