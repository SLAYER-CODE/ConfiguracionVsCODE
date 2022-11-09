import { Field, InputType } from "type-graphql";
import { GpsServices } from "../../entity/GpsTrasos";
import { ProductImages, Products } from "../../entity/Products";
import { ProductsInput } from "./ProductsImputs";

@InputType()
export class GpsServicesInput implements Partial<GpsServices> {

    @Field(() => String)
    direccion!:String

    @Field(()=>String)
    latitud!:String

    @Field(()=>String)
    longitud!:String

}
