import express, { Router } from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { PingResolver } from './resolvers/ping';
import { CategorieResolver, ProductsResolver, SessionsResolver } from './resolvers/UserResolvers';
import { buildSchema } from 'type-graphql';
import { autochekercustom } from '../src/verifiAuth/AuthVerifity'
import { getUserToken } from './verifiAuth/getUserToken';

import { GraphQLUpload,graphqlUploadExpress } from 'graphql-upload';
import IRouter  from  '../src/Routes/indexRouters'
import { Console } from 'console';
export async function StartServer() {
    const app = express()
    app.use(IRouter);   

    
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [PingResolver, SessionsResolver, ProductsResolver, CategorieResolver], authChecker: autochekercustom
        }),
        context:  async ({ req, res }) => {
            // console.log(res)
            console.log("VERIFICANDO TOKEN...")
            console.log(req.headers.authorization)
            const user = await getUserToken(req.headers.authorization?.split(" ")[1])
            // console.log(res)
            const context = {
                req,
                user: user
            }
            console.log("TU RESULTADO"+context)
            return context
        },
        // uploads: true, // disable apollo upload property en verciones antiguas esta es 3.3 entonces si tiene soporte verfificar
        //https://www.apollographql.com/docs/apollo-server/data/file-uploads/#integrating-with-express
    })
    
    
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
    return app
} 