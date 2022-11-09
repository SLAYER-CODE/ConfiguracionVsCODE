import { Field, InputType } from "type-graphql";
import { GpsServices, GpsUser } from "../../entity/GpsTrasos";
import { ProductImages, Products } from "../../entity/Products";
import { ProductsInput } from "./ProductsImputs";

@InputType()
export class GpsServicesInput implements Partial<GpsServices> {

    @Field()
    direccion!:string

    @Field()
    latitud!:string

    @Field()
    longitud!:string

}



@InputType()
export class GpsUserInput implements Partial<GpsUser> {

    @Field()
    direccion!:string

    @Field()
    latitud!:string

    @Field()
    longitud!:string

}
