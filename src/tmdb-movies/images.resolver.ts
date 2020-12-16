import { Args, Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Image, Images } from 'src/models';

@Resolver(() => Images)
export class ImagesResolver {
  @ResolveField(() => [Image])
  async backdrops(
    @Parent() parent: Images,
    @Args('size', { type: () => Int, defaultValue: 3 }) size: number,
  ): Promise<Image[]> {
    return parent.backdrops.slice(0, size);
  }

  @ResolveField(() => [Image])
  async posters(
    @Parent() parent: Images,
    @Args('size', { type: () => Int, defaultValue: 1 }) size: number,
  ): Promise<Image[]> {
    return parent.posters.slice(0, size);
  }
}
