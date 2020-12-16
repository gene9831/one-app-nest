import { NotFoundException } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument } from 'src/models';

@Resolver(() => Person)
export class PersonsResolver {
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
  ) {}

  @Query(() => Person)
  async person(@Args('id', { type: () => Int }) id: number) {
    const person = await this.personModel.findOne({ id: id }).exec();
    if (!person) {
      throw new NotFoundException();
    }
    return person;
  }
}
