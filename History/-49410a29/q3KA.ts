
import { query } from "express";
import {
  Query,
  Resolver,
  Mutation,
  Arg,
  InputType,
  Ctx,
  FieldResolver,
  Authorized,
} from "type-graphql";
import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from "type-graphql";
import { Loader } from "type-graphql-dataloader";
import * as admin from "firebase-admin";
import { ContextAuth } from "../../Context";
import { type } from "os";

//Import Entitys para poder Usarlos en el CRUD
import { Categories } from "../../entity/Categories";
import { Phone, Users } from "../../entity/Users";
import { Products } from "../../entity/Products";
import { gql } from "apollo-server-express";
import { loggerResolvers } from "../../utils/Loogerr";
import { getUserToken } from "../../verifiAuth/getUserToken";
import { Brands } from "../../entity/Brand";

@InputType()
class PhoneInput {
  @Field()
  // @Field(() => Int)
  phone_id!: number;
  @Field()
  // @Field(() => String)
  country_code!: string;
  @Field()
  // @Field(() => String)
  phone_number!: string;
}