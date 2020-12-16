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
import { BaseMovie, Collection, CollectionDocument } from 'src/models';

@Resolver(() => Collection)
export class CollectionsResolver {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<CollectionDocument>,
  ) {}

  @Query(() => Collection)
  async collection(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Collection> {
    const collection = await this.collectionModel.findOne({ id: id }).exec();
    if (!collection) {
      throw new NotFoundException();
    }
    return collection;
  }

  @ResolveField(() => [BaseMovie])
  async parts(@Parent() parent: Collection): Promise<BaseMovie[]> {
    if (parent.parts?.length > 0) {
      return parent.parts;
    }
    const collection = await this.collectionModel
      .findOne({ id: parent.id })
      .exec();
    return collection?.parts || [];
  }
}
