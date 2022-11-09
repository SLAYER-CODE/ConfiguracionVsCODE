import { Field, InputType } from "type-graphql";
import { ProductImages, Products } from "../../entity/Products";
import { ProductsInput } from "./ProductsImputs";

@InputType()
export class ImageProductInput implements Partial<ProductImages> {

    @Field(() => String)
    image_name!: string

    @Field(() => String)
    image_description!: string

    @Field((type) => [ProductsInput])
    brands_products?: ProductsInput[];
}
