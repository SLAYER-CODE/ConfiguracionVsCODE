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
import { loggerImages, loggerResolvers } from "../utils/Loogerr";
import { getUserToken } from "../verifiAuth/getUserToken";
import { Brands } from "../entity/Brand";
import { ProductsInput } from "./Inputs/ProductsImputs";
import { UsersInput } from "./Inputs/UserInputs";
import { asyncForEach } from "./UserResolvers";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";
import { Console } from "console";
import { GpsServices } from "../entity/GpsTrasos";
// import mapboxgl from 'mapbox-gl';



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


//   const resolvers = {
//     Upload: GraphQLUpload,
//     Mutation: {
//       fileUpload: async (parent, { file }) => {
//       let url = [];
//       for (let i = 0; i < file.length; i++) {
//       const { createReadStream, filename, mimetype } = await    file[i];
//       const stream = createReadStream();
//       const assetUniqName = fileRenamer(filename);
//       const pathName = path.join(__dirname,   `./upload/${assetUniqName}`);
//       await stream.pipe(fs.createWriteStream(pathName));
//       const urlForArray = `http://localhost:4000/${assetUniqName}`;
//       url.push({ url: urlForArray });
//     }
//    return url;
//   },
//  },
// };
  

  @Authorized(["USER", "UNDEFINED"])
  @Mutation(() => Products)
  async createproduct(
    @Arg("myval", () => ProductsInput) myproduct: ProductsInput,
    @Ctx() ctx: ContextAuth
  ) {
    loggerResolvers.warn("CREANDO PRODUCTO"+ctx.user.id)

    
    // var imagenes=[];
    // for (let index = 0; index < File.length; index++) {
    //     var names = myproduct.image_realation![index];
    //     const { createReadStream, filename, mimetype } = await File[index];
    //     var res = (new Promise<Boolean>(async (resolve, reject) =>{
    //         createReadStream()
    //         .pipe(createWriteStream(path.join(__dirname,'../')+`/public/uploads/${names.image_name}`))
    //         .on("finish",()=>{
    //             loggerResolvers.warn("Se subio el archivo: "+names.image_name)
    //             resolve(true)
    //         }).on("error",(error)=>{
    //             loggerResolvers.error("Ubo un error al subir el servidor al subir: "+names.image_name+error)
    //             reject(false)
    //         })
    //     })
    //     )
    //     imagenes.push(res)
    // }
    
    

    // const newUser = Products.create({...myproduct,user_id:userid})
    // const newUser = Products.create({...myproduct,user:Users.find({where:{user_id:myproduct.user_id}})})
    // const dat = await Products.createQueryBuilder().insert().values(myproduct).orIgnore(undefined).execute()
    loggerResolvers.debug("Creando producto e insertandolo");
    var newnewCategoryProducts: Categories[] = [];

    await asyncForEach(myproduct.category_products?myproduct.category_products:[], async (category) => {
      const val = await Categories.findOne({
        where: { category_name: category.category_name },
      });
      loggerResolvers.info("Comprobando si la categoria del producto existe: " + val?.category_name.toString());
      if (val == undefined) {
        loggerResolvers.debug("La categoria no existe [Insertando...]")
        newnewCategoryProducts.push(category);
      } else {
        loggerResolvers.debug("La categoria existe" + val.category_name)
        newnewCategoryProducts.push(val);
      }
    });
  // mapboxgl.accessToken = 'pk.eyJ1IjoidGlvcGF6aGMiLCJhIjoiY2tuYWoydnA1MHRrYzJ3cGpvaWx1aW92NCJ9.xS5kjuxwEodkv-Y6iqRGhg';
  // var dato = new mapboxgl.Map()
    // var primero = dato.queryRenderedFeatures(new mapboxgl.Point(-70.0199896, -15.8466065))

    // console.log(primero)
    // await myproduct.category_products.forEach( async (category) =>{
    
    // })
    myproduct.category_products = newnewCategoryProducts;
    // console.log({...myproduct,category_products:newnewCategoryProducts})

    // for(const category:Categories in myproduct.category_products){
    //     console.log(category.)
    // }

    loggerResolvers.debug("Asignado Usuario del producto creado")
    const newUser = Products.create(myproduct);
    loggerResolvers.debug("USUARIO"+ctx.user.email)
    loggerResolvers.debug("FInal"+ctx.user.id)
    if(ctx.user.id==undefined){
      newUser.user_relation = await Users.findOneOrFail({where:{uid: "I7mvQQ2mY0Vp9BqOupOWCJ07ECD3"}})
    }else{
      newUser.user_relation = await Users.findOneOrFail({where:{uid:ctx.user.id} })
    }
    // newUser.user_relation = await Users.findOneOrFail({
    //   where: { uid: "o1tsm2ksToY1BAfezjmoKsP7Gn32" },
    // });


    // loggerResolvers.info("ID del usuario []: " + newUser.user_relation.email)
    // var dato =  await Promise.all(imagenes)
    // loggerImages.info("Imagenes "+dato.toString())
    loggerResolvers.info("Se guardo!")
    return await newUser.save();
  }

  @Authorized(["USER","UNDEFINED"])
  @Query(() => [Products])
  async Products() {
    const dat = Products.find({relations:["gps_relation","user_relation"]});
    loggerResolvers.debug("Productos obtenidos");
    return dat;
  }

  @Authorized(["USER","UNDEFINED"])
  @Query(() => [Products])
  async ProductsProfile(@Ctx() ctx: ContextAuth) {
    console.log("Obteniendo los productos de :"+ctx.user.id)
    const dat = await Products.find({where:{user_relation:{uid:ctx.user.id}},relations:["user_relation","gps_relation"],order:{update_product:"DESC"}});
    // console.log(dat[0].products_contrate)
    return dat;
  }

  @Authorized(["USER","UNDEFINED"])
  @Query(() => [Products])
  async ProductsProfileContrate(@Ctx() ctx: ContextAuth) {
    console.log("SE ENTRO")
    var usuario:Products[]=[]
    const dat = await Products.find({relations:["user_relation","gps_relation"],order:{update_product:"DESC"}});
    dat.map((a,index)=>{
      console.log(a)
      a.products_contrate?.map((k,index)=>{
        if(k.uid==ctx.user.id){
          usuario.push(a)
        }
      })
    })
    return usuario;
  }
}


@Resolver()
export class CategorieResolver {
  @Authorized(["USER", "UNDEFINED"])
  @Query(() => [Categories])
  Categories(@Ctx() ctx: ContextAuth): Promise<Categories[]> {
    const Categorys = Categories.find();
    loggerResolvers.info("Peticion del usuario: " + ctx.user);
    loggerResolvers.info("Retornando todas las categorias: " + Categorys);
    return Categorys;
  }
}

@Resolver()
export class LocationServiceResolver {
  @Authorized(["USER", "UNDEFINED"])
  @Query(() => [GpsServices])
  GpsServices(@Ctx() ctx: ContextAuth): Promise<GpsServices[]> {
    const Locations = GpsServices.find({relations:["gps_relation"]});
    loggerResolvers.info("Peticion del usuario: " + ctx.user);
    return Locations;
  }
}


@Resolver()
export class BrandResolver {
  @Authorized(["USER", "UNDEFINED"])
  @Query(() => [Brands])
  Brands(@Ctx() ctx: ContextAuth): Promise<Brands[]> {
    const Brandsy = Brands.find();
    loggerResolvers.info("Peticion del usuario: " + ctx.user);
    loggerResolvers.info("Retornando todas las categorias: " + Brandsy);
    return Brandsy;
  }
}
