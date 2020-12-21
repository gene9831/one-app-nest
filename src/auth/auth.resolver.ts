import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/decorators/gql-user.decorator';
import { AuthResult } from 'src/models';
import { GqlLocalAdminAuthGuard } from './gql-local-admin-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  @UseGuards(GqlLocalAdminAuthGuard)
  async authAdmin(
    @Args('username') _username: string,
    @Args('password') _password: string,
    @CurrentUser() user: any,
  ): Promise<AuthResult> {
    return this.authService.sign(user);
  }
}
