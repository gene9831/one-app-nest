import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseMovie, Movie, MovieDocument } from 'src/models';

@Resolver(() => BaseMovie)
export class BaseMoviesResolver {
  constructor(
    @InjectModel(Movie.name) private readonly movieModel: Model<MovieDocument>,
  ) {}

  @ResolveField(() => Boolean)
  async hasVideo(@Parent() parent: BaseMovie): Promise<boolean> {
    return this.movieModel.exists({ id: parent.id });
  }
}
