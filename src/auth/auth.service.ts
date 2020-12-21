import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { AuthResult } from 'src/models';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string): Promise<any> {
    const admin = await this.adminService.findOne(username);
    if (admin && admin.password === password) {
      const { password, ...others } = admin.toJSON();
      return others;
    }
    return null;
  }

  async sign(user: any): Promise<AuthResult> {
    const payload = { username: user.username, sub: user._id };
    const access_token = this.jwtService.sign(payload);
    const { exp } = this.jwtService.decode(access_token) as any;
    const result = {
      username: user.username,
      access_token: access_token,
      expires_at: exp,
    };
    return result;
  }
}
