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
import { BrandsInput, CategoriesInput } from "./CategoryImputs";

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

    @Field({})
    update_product?: Date | undefined;

  @Field()
  quantity!: number;

  @Field((type) => [CategoriesInput])
  category_products!: Categories[];

  @Field((type) => [BrandsInput])
  brands_products?: Brands[] | undefined;
  // @Field()
  // user_id!:number
}


