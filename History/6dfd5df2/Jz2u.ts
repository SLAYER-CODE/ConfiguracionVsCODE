import { query } from 'express'
import { Query, Resolver, Mutation, Arg, InputType, Ctx, FieldResolver, Authorized } from 'type-graphql'
import { Field, Float, GraphQLISODateTime, ID, Int, ObjectType } from 'type-graphql'
import { Loader } from 'type-graphql-dataloader';
import * as admin from 'firebase-admin';
import { ContextAuth } from '../Context';
import { type } from 'os';

//Import Entitys para poder Usarlos en el CRUD
import { Categories } from '../entity/Categories'
import { Phone,Users } from '../entity/Users'
import { Products } from '../entity/Products'
import { gql } from 'apollo-server-express';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

// Impotando datos que serviran para almacenar las imagenes local menete

import path, { parse,join } from 'path';
import { createWriteStream } from 'fs';
import { ServerApp } from '../utils/Inspectors';
import { loggerImages, loggerResolvers } from '../utils/Loogerr';
import { ProductsInput } from './Inputs/ProductsImputs';


// Modulo de registro y analisis de errores
//
// curl --request POST \
//     --header 'content-type: application/json' \
//     --url http://localhost:2016/graphql \
//     --data '{"query":"mutation SingleUpload($file: Upload!) {\n  singleUpload(file: $file)\n}","variables":{"send.png":null}}'

//     curl -X POST \
//     http://localhost:2016/graphql \
//     -H 'Cache-Control: no-cache' \
//     -F 'operations={"query":"mutation SingleUpload($file: Upload!) {singleUpload(files: $files)}","variables":{}}' \
//     -F 'map={"0":["variables.files.0"]}' \
//     -F '"1"=send.png'


// curl --request POST \
//     --header 'content-type: application/json' \
//     --url http://localhost:2016/graphql \
//     --data '{"query":"mutation SingleUpload($file: Upload!) {\n  singleUpload(file: $file)\n}","variables":{"file":"dqwdwq"}}'
    
@Resolver()
export class ImagenResolver {
    @Authorized(["USER", "UNDEFINED"])

    @Mutation(() => Boolean)
    async singleUpload(
      @Arg("file", () => GraphQLUpload)
      { 
        createReadStream,
         filename,
          encoding ,
           mimetype 
          }: FileUpload
    ):Promise<Boolean>{
      return new Promise<Boolean>(async (resolve, reject) =>{
        loggerImages.info("Se esta subiendo"+filename)
        createReadStream()
        .pipe(createWriteStream(path.join(__dirname,'../../')+`uploads/${filename}`))
        .on("finish",()=>{
            // ServerApp.
            loggerResolvers.info("Se subio el archivo "+filename+"Con extencion")
            resolve(true)
        }).on("error",(error)=>{
            loggerResolvers.info("Ubo un error al subir el servidor"+filename+error)
            reject(false)
        })
    })}
    

    //   Esto es una funcion para hacerlo directamente usando el serividor de CLOUD de Google;


    //   createReadStream()
    //       .pipe(
    //         storage.bucket(bucketName).file(filename).createWriteStream({
    //           resumable: false,
    //           gzip: true,
    //         })
    //       )
    //       //3
    //       .on("finish", () =>
    //         storage
    //           .bucket(bucketName)
    //           .file(filename)
    //           .makePublic()
    //           .then((e) => {
    //             console.log(e[0].object);
    //             console.log(
    //               `https://storage.googleapis.com/${bucketName}/${e[0].object}`
    //             );
    //           })
    //       )
    //       .on("error", () => reject(false))
    //   );
    // }

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

    // @Authorized(["USER","UNDEFINED"])
    // @Mutation(() => Products)
    // async uploadFile(
    //     @Arg("val", () => ProductsInput) myproduct: ProductsInput,@Ctx() ctx: ContextAuth
    // ){
    //     // SingleU
    //     // return await newUser.save()

    // }

}

