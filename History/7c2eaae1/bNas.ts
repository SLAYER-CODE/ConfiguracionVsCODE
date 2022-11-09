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

  @Field({nullable:false})
  price_cantidad!: number;
  
  @Field({nullable:false})
  price_unity!: number;

  @Field({ nullable: true })
  description!: string;

  @Field({nullable:true})
  qr!: number;

@Field({ nullable:true})
update_product!: Date;

  @Field({nullable:true})
  quantity_cantidad!: number | undefined;

  @Field({nullable:true})
  quantity_unity!: number | undefined;


  @Field((type) => [CategoriesInput])
  category_products?: Categories[];

  @Field((type) => [BrandsInput])
  brands_products?: Brands[];
  // @Field()
  // user_id!:number
}


