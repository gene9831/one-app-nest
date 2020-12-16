import { Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre, GenreDocument } from 'src/models';

@Resolver()
export class GenresResolver {
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<GenreDocument>,
  ) {}

  @Query(() => [Genre], { name: 'genres' })
  async genres(): Promise<Genre[]> {
    return this.genreModel.find().exec();
  }
}
