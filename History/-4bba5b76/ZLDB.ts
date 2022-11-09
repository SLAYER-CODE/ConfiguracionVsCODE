import { Field, InputType } from "type-graphql";
import { ProductImages, Products } from "../../entity/Products";
import { ProductsInput } from "./ProductsImputs";

@InputType()
export class ImageProductInput implements Partial<ProductImages> {

    @Field({ name: "id", nullable: true })
    image_id?: number;

    @Field()
    image_name!: string

    @Field()
    image_description?: string

    // @Field((type) => [ProductsInput])
    // brands_products?: ProductsInput[];
}
