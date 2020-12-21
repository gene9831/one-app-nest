import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlLocalAdminAuthGuard extends AuthGuard('local-admin') {
  // 使用UseGuard后，会执行canActivate()函数，返回Boolean值
  // 也可以手动重写canActivate()函数，就不需要strategy了

  // 下面是auth.guard.js的大概步骤
  // node_modules/@nestjs/passport/dist/auth.guard.js canActivate()
  // getRequest() -> strategy.validate() -> handleRequest() -> return true

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    const req = ctx.getContext().req;
    req.body.username = args.username;
    req.body.password = args.password;
    return req;
  }
}
