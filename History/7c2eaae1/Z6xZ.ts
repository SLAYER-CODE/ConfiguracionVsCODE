import { query } from "express";
import {
  InputType,
} from "type-graphql";
import {
  Field,
} from "type-graphql";

//Import Entitys para poder Usarlos en el CRUD
import { Categories } from "../../entity/Categories";
import { Products } from "../../entity/Products";
import { Brands } from "../../entity/Brand";
import { BradsInput, CategoriesInput } from "./CategoryImputs";

@InputType()
export class ProductsInput implements Partial<Products> {
  // @Field({name:'id'})
  // product_id!:number;

  @Field()
  product_name!: string;

  @Field()
  old_price!: number;

  @Field()
  price!: number;

  @Field({ nullable: true })
  description!: string;

  @Field()
  brand!: string;

  @Field()
  quantity!: number;

  @Field((type) => [CategoriesInput])
  category_products!: Categories[];

  @Field((type) => [BradsInput])
  brand_products!: Brands[];
  // @Field()
  // user_id!:number
}


