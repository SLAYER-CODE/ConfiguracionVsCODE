import { query } from "express";
import {
  Query,
  Resolver,
  Mutation,
  Arg,
  InputType,
  Ctx,
  FieldResolver,
  Authorized,
} from "type-graphql";
import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from "type-graphql";
import { Loader } from "type-graphql-dataloader";
import * as admin from "firebase-admin";
import { ContextAuth } from "../Context";
import { type } from "os";

//Import Entitys para poder Usarlos en el CRUD
import { Categories } from "../entity/Categories";
import { Phone, Users } from "../entity/Users";
import { Products } from "../entity/Products";
import { gql } from "apollo-server-express";
import { loggerResolvers } from "../utils/Loogerr";

// Resolvers Mutation and Image updaload Dowload;

@InputType()
class wishlistInput {
  @Field()
  // @Field(()=>ID)
  wish_id!: number;
}
@InputType()
class shoppingcartInput {
  @Field()
  // @Field(()=>ID)
  shoppingCardt_id!: number;
}

@InputType()
class PhoneInput {
  @Field()
  // @Field(() => Int)
  phone_id!: number;
  @Field()
  // @Field(() => String)
  country_code!: string;
  @Field()
  // @Field(() => String)
  phone_number!: string;
}

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

  @Field()
  brand!: string;

  @Field()
  quantity!: number;

  @Field((type) => [CategoriesInput])
  category_products!: Categories[];
  // @Field()
  // user_id!:number
}

@InputType()
export class UsersInput implements Partial<Users> {
  @Field({ nullable: true })
  user_id!: number;
  // @Field(() => String)

  // @Field()
  // username!: string;

  // @Field(() => String)
  @Field({ nullable: false })
  uid!: string;
  // @Field(() => String)

  // @Field()
  // lastname!: string;

  // @Field(() => String)
  @Field()
  email!: string;
  // @Field(() => String)

  // @Field(() => GraphQLISODateTime)
  @Field()
  birthday!: Date;
  // @Field(() => Blob)
  @Field({ nullable: true })
  photo!: string;

  // @Field(() => String)
  @Field({ nullable: true })
  random_code!: number;

  // phone_id!:Phonee;
  // @Field(() => PhoneInput)
  // @Field()
  // phone_id!: PhoneInput;

  // // wish_id!:ListWish;
  // @Field(type=>[wishlistInput])
  // // @Field(() => [wishlistInput])
  // // @Field()
  // wish_id!: wishlistInput[];

  // // shoppingCardt_id!:ShoppingCart;
  // @Field(type=>shoppingcartInput)
  // // @Field(() => [shoppingcartInput])
  // shoppingCardt_id!: shoppingcartInput[];
}

@InputType()
class CategoriesInput implements Partial<Categories> {
  // @Field(()=>ID)
  // @PrimaryGeneratedColumn({name:'id'})
  @Field({ name: "id", nullable: true })
  category_id!: number;

  // @Field(()=>String)
  // @Column({length:100})
  @Field()
  category_name!: string;
}

//Obtener todas las categorias de la base de datos 
@Resolver()
export class CategorieResolver {
  @Authorized(["USER"])
  @Query(() => [Categories])
  Categories(@Ctx() ctx: ContextAuth): Promise<Categories[]> {
    const cate = Categories.find();
    loggerResolvers.info("Peticion del usuario: "+ctx.user);
    loggerResolvers.info("Retornando todas las categorias: "+cate);
    return cate;
  }
}

export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => void
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}

@Resolver()
export class ProductsResolver {
  // @FieldResolver()
  // @Loader<number, Photo[]>(async (ids, { context }) => {  // batchLoadFn
  //   const photos = await getRepository(Photo).find({
  //     where: { user: { id: In([...ids]) } },
  //   });
  //   const photosById = groupBy(photos, "userId");
  //   return ids.map((id) => photosById[id] ?? []);
  // })
  // photos(@Root() root: User) {
  //   return (dataloader: DataLoader<number, Photo[]>) =>
  //     dataloader.load(root.id);
  // }

  @Authorized(["USER", "UNDEFINED"])
  @Mutation(() => Products)
  async createproduct(
    @Arg("myval", () => ProductsInput) myproduct: ProductsInput,
    @Ctx() ctx: ContextAuth
  ) {
    // const newUser = Products.create({...myproduct,user_id:userid})
    // const newUser = Products.create({...myproduct,user:Users.find({where:{user_id:myproduct.user_id}})})
    // const dat = await Products.createQueryBuilder().insert().values(myproduct).orIgnore(undefined).execute()
    loggerResolvers.debug("Creando producto e insertandolo");
    var newnewCategoryProducts: Categories[] = [];

    await asyncForEach(myproduct.category_products, async (category) => {
      const val = await Categories.findOne({
        where: { category_name: category.category_name },
      });
      loggerResolvers.info("Comprobando si la categoria del producto existe: "+ val?.category_name.toString());
      if (val == undefined) {
        loggerResolvers.debug("La categoria no existe [Insertando...]")
        newnewCategoryProducts.push(category);
      } else {
        loggerResolvers.debug("La categoria existe" + val.category_name)
        newnewCategoryProducts.push(val);
      }
    });
    // await myproduct.category_products.forEach( async (category) =>{

    // })
    myproduct.category_products = newnewCategoryProducts;
    // console.log({...myproduct,category_products:newnewCategoryProducts})

    // for(const category:Categories in myproduct.category_products){
    //     console.log(category.)
    // }

    loggerResolvers.debug("Asignado Usuario del producto creado")
    const newUser = Products.create(myproduct);
    // newUser.user= await Users.findOneOrFail({where:{uid:ctx.user.id} })
    newUser.user = await Users.findOneOrFail({
      where: { uid: "o1tsm2ksToY1BAfezjmoKsP7Gn32" },
    });
    loggerResolvers.info(newUser.user.uid)
    return await newUser.save();
  }

  @Authorized(["USER"])
  @Query(() => [Products])
  Products() {
    const dat = Products.find({ relations: ["user"] });
    loggerResolvers.debug("Productos obtenidos");
    return dat;
  }
}
@Resolver()
export class SessionsResolver {
    //Crear una session de entrada de usuario

  @Authorized(["ROOT"])
  @Mutation(() => Users)
  async createSessions(@Arg("myval", () => UsersInput) myval: UsersInput) {
    const TokenVerificado = await admin.auth().verifyIdToken(myval.uid, true);
    const newUser = Users.create(TokenVerificado);
    loggerResolvers.info("Usuario Creado! Email:"+TokenVerificado.email?'NULL':TokenVerificado.email)
    loggerResolvers.debug(newUser);
    return await newUser.save();
  }
  //Comprobar la existencia del usuario
  @Authorized(["USER"])
  @Query(() => Boolean)
  async comprobationUser(@Arg("token", () => String) token: string) {
      loggerResolvers.debug("Comprobando Usuario")
    const val = await Users.find({ where: { uid: token }, select: ["uid"] });
    if (val.length != 0 && val != undefined) {
      return true;
    } else {
      return false;
    }
  }

  @Authorized(["ADMIN", "UNDEFINED"])
  @Query(() => [Users])
  Sessiones() {
    loggerResolvers.debug("Buscando session y retornando...")
    const dat = Users.find();
    return dat;
  }
}
