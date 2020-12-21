import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(
  Strategy,
  'local-admin',
) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    // 提取body里面的username和password字段，将他们作为这里的变量
    const user = await this.authService.validateAdmin(username, password);
    // 这里也可以直接返回user，后面的AuthGuard.handleRequest()函数里面会判断user是否为空
    if (!user) {
      throw new UnauthorizedException();
    }
    // user会赋值给req.user
    return user;
  }
}
