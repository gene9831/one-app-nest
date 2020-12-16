import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetMoviesArgs } from 'src/dto/get-movies.args';
import { Movie, MovieDocument, Person, PersonDocument } from 'src/models';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(
    @InjectModel(Movie.name)
    private readonly movieModel: Model<MovieDocument>,
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
  ) {}

  @Query(() => Movie)
  async movie(@Args('id', { type: () => Int }) id: number): Promise<Movie> {
    const movie = await this.movieModel.findOne({ id: id }).exec();
    if (!movie) {
      throw new NotFoundException();
    }
    return movie;
  }

  @ResolveField(() => [Person])
  async directors(@Parent() parent: Movie): Promise<Person[]> {
    return this.personModel.find({ id: { $in: parent.directors } }).exec();
  }

  @Query(() => [Movie])
  async movies(@Args() args: GetMoviesArgs): Promise<Movie[]> {
    const match = {
      $and: [{}],
    };
    if (args.search) {
      const search = args.search;
      match.$and.push({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { original_title: { $regex: search, $options: 'i' } },
          {
            'production_companies.name': {
              $regex: search,
              $options: 'i',
            },
          },
          { 'directors.name': { $regex: search, $options: 'i' } },
          {
            'directors.also_known_as': {
              $regex: search,
              $options: 'i',
            },
          },
        ],
      });
    }
    if (args.genreIds?.length > 0) {
      match.$and.push({
        [args.genreFilterType]: args.genreIds.map((id) => ({
          'genres.id': id,
        })),
      });
    }
    const movies: MovieDocument[] = await this.movieModel
      .aggregate([
        {
          $lookup: {
            from: 'tmdb.persons',
            localField: 'directors',
            foreignField: 'id',
            as: 'directors',
          },
        },
        { $match: match },
        { $sort: { [args.orderBy]: args.order, title: 1 } },
        { $skip: args.skip },
        { $limit: args.limit },
      ])
      .exec();
    return movies;
  }
}
