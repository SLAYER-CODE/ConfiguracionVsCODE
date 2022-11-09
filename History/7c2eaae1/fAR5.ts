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
  price_cantidad?: number | undefined;
  
  @Field()
  price_unity?: number | undefined;

  @Field({ nullable: true })
  description!: string;

@Field({ nullable:true})
update_product?: Date | undefined;

  @Field({nullable:true})
  quantity_cantidad?: number | undefined;



  qu


  @Field((type) => [CategoriesInput])
  category_products!: Categories[];

  @Field((type) => [BrandsInput])
  brands_products?: Brands[] | undefined;
  // @Field()
  // user_id!:number
}


