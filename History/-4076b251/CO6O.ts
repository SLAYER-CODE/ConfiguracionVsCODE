import { Arg, Args, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { ContextAuth } from "../Context";
import { Products } from "../entity/Products";

@Resolver()
export class UpdateResolver {
    @Authorized(["ROOT"])
    @Mutation(() => Boolean)
    async AgregateRelationService(@Arg("service_id", () => Int) myval:Int16Array, @Ctx() ctx: ContextAuth) {
        try{
        const product = await Products.findOneOrFail({where:{product_id:myval}})
        getConnection().createQueryBuilder().relation(Products,"products_contrate").of(product).add(ctx.user.id)
        }catch(e){
            console.log(e)
            return false
        }
        return true;
    }
}
