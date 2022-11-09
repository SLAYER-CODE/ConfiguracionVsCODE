import { query } from "express";
import {
  InputType,
} from "type-graphql";
import {
  Field,
} from "type-graphql";

//Import Entitys para poder Usarlos en el CRUD
import { Categories } from "../../entity/Categories";
import { ProductImages, Products } from "../../entity/Products";
import { Brands } from "../../entity/Brand";
import { BrandsInput, CategoriesInput } from "./CategoryImputs";
import { ImageProductInput } from "./ImageImputs";
import { GpsServices } from "../../entity/GpsTrasos";
import { GpsServicesInput } from "./gpsImputs";

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
  
  @Field({nullable:true})
  price_unity?: number;

  @Field({ nullable: true })
  description!: string;

  @Field({ nullable:true})
  update_product!: Date;

  @Field({nullable:true})
  quantity_cantidad!: number;

  @Field({nullable:true})
  quantity_unity!: number ;


  @Field((type) => [CategoriesInput])
  category_products?: Categories[];

  @Field((type) => [BrandsInput])
  brands_products?: Brands[];

  @Field((type) => [ImageProductInput],)
  image_realation?: ProductImages[];

  @Field((type) => [GpsServicesInput],)
  gps_relation?: GpsServices[];

  
  // @Field()
  // user_id!:number
  // @Field((type) => [BrandsInput])
  // brands_products?: Brands[];
}


