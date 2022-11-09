import { Arg, Args, Authorized, Ctx, Int, Mutation, Resolver } from "type-graphql";
import { createQueryBuilder, getConnection } from "typeorm";
import { ContextAuth } from "../Context";
import { GpsUser } from "../entity/GpsTrasos";
import { Products } from "../entity/Products";
import { Users } from "../entity/Users";
import { GpsUserInput } from "./Inputs/gpsImputs";

@Resolver()
export class UpdateResolver {
    @Authorized(["ROOT","USER"])
    @Mutation(() => Boolean)
    async AgregateRelationService(@Arg("service_id", () => Int) myval:Int16Array, @Ctx() ctx: ContextAuth) {
        console.log(myval)
        try{
            const user = await Users.findOneOrFail({where:{uid:ctx.user.id} })
            const product = await Products.findOneOrFail({where:{product_id:myval}})
            createQueryBuilder().relation(Products,"products_contrate").of(product).add(user.user_id)
        }catch(e){
            console.log(e)
            return false
        }
        return true;
    }

    @Authorized(["ROOT","USER"])
    @Mutation(() => Boolean)
    async UpdateRelationLocation(@Arg("location", () => GpsUserInput) myval:GpsUserInput, @Ctx() ctx: ContextAuth) {
        console.log(myval)
        try{
            var primero = await createQueryBuilder().insert().into(GpsUser).values(myval)
            console.log(primero)
        }catch(e){
            console.log(e)
            return false
        }
        return true;
    }
}
