import { query } from "express";
import {
  Type,
} from "type-graphql";
import {
  Field,
} from "type-graphql";

//Import Entitys para poder Usarlos en el CRUD
import { Categories } from "../../entity/Categories";
import { Products } from "../../entity/Products";
import { Brands } from "../../entity/Brand";
import { Brands, Categories } from "./CategoryImputs";

@Type()
export class Products implements Partial<Products> {
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

@Field({ nullable:true})
update_product?: Date | undefined;

  @Field()
  quantity!: number;

  @Field((type) => [Categories])
  category_products!: Categories[];

  @Field((type) => [Brands])
  brands_products?: Brands[] | undefined;
  // @Field()
  // user_id!:number
}


