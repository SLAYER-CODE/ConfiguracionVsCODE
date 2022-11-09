import { query } from "express";
import {
  InputType,
} from "type-graphql";
import {
  Field,

} from "type-graphql";


//Import Entitys para poder Usarlos en el CRUD
import { Users } from "../../entity/Users";


@InputType()
export class UsersInput implements Partial<Users> {
  @Field({ nullable: true })
  user_id!: number;
  // @Field(() => String)

  // @Field()
  // username!: string;

  // @Field(() => String)
  @Field({ nullable: false })
  uid!: string;
  // @Field(() => String)

  // @Field()
  // lastname!: string;

  // @Field(() => String)
  @Field()
  email!: string;
  // @Field(() => String)

  // @Field(() => GraphQLISODateTime)
  @Field()
  birthday!: Date;
  // @Field(() => Blob)
  @Field({ nullable: true })
  photo!: string;

  // @Field(() => String)
  @Field({ nullable: true })
  random_code!: number;

  @Field({ nullable: true })
  username!: string;
  // phone_id!:Phonee;
  // @Field(() => PhoneInput)
  // @Field()
  // phone_id!: PhoneInput;

  // // wish_id!:ListWish;
  // @Field(type=>[wishlistInput])
  // // @Field(() => [wishlistInput])
  // // @Field()
  // wish_id!: wishlistInput[];

  // // shoppingCardt_id!:ShoppingCart;
  // @Field(type=>shoppingcartInput)
  // // @Field(() => [shoppingcartInput])
  // shoppingCardt_id!: shoppingcartInput[];
}