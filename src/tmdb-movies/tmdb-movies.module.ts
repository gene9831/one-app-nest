import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Collection,
  CollectionSchema,
  Genre,
  GenreSchema,
  Movie,
  MovieSchema,
  Person,
  PersonSchema,
} from 'src/models';
import {
  BaseMoviesResolver,
  CollectionsResolver,
  GenresResolver,
  ImagesResolver,
  MoviesResolver,
  PersonsResolver,
} from '.';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Collection.name,
        schema: CollectionSchema,
        collection: 'tmdb.collections',
      },
      {
        name: Genre.name,
        schema: GenreSchema,
        collection: 'tmdb.genres',
      },
      {
        name: Movie.name,
        schema: MovieSchema,
        collection: 'tmdb.movies',
      },
      {
        name: Person.name,
        schema: PersonSchema,
        collection: 'tmdb.persons',
      },
    ]),
  ],
  providers: [
    BaseMoviesResolver,
    CollectionsResolver,
    GenresResolver,
    ImagesResolver,
    MoviesResolver,
    PersonsResolver,
  ],
})
export class TmdbMoviesModule {}
