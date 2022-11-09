import * as admin from 'firebase-admin';
import { userAutenticate } from '../Context';
import { UsersInput } from '../resolvers/Inputs/UserInputs';

// Importando los modelos para ser representados en este servidor
import { ListWish,ShoppingCart } from '../entity/Shoping';
import { Phone,Users } from '../entity/Users';
import { loggerAutentication } from '../utils/Loogerr';

export async function getUserToken(token: string | undefined):Promise<userAutenticate> {
    if (token != undefined) {
        loggerAutentication.info("Verificando ...."+token)
        try {
            const decodedIdToken = await admin.auth().verifyIdToken(token.split(" ")[1])
            // loggerAutentication.debug(decodedIdToken.)
            if (decodedIdToken != undefined) {
                const user = await Users.findOne({ where: {uid:decodedIdToken.uid} })
                loggerAutentication.info("Next")
                if(user!=undefined) {
                    loggerAutentication.info("Se encontro dentro de la base de datos retornando...")
                    return {
                        autenticate:true,
                        id:decodedIdToken.uid,
                        email:decodedIdToken.email,
                        roles: ["USER"]
                    }
                }else{
                    loggerAutentication.info("No se encontro el usuario en la base de datos creando..")
                    const newUser =  Users.create({
                        lastToken:token,
                        email:decodedIdToken.email,
                        uid:decodedIdToken.uid,
                        photo:decodedIdToken.picture,
                        username:decodedIdToken.iss,
                        random_code: (Math.floor(Math.random() * (99999 - 11111)) + 11111),
                        birthday:Date()
                       })
                    
                    newUser.phone_id=await Phone.create({country_code:"primero",phone_number:decodedIdToken.phone_number})
                    
                    newUser.wish_id=[await ListWish.create()]

                    newUser.shoppingCardt_id=await ShoppingCart.create()
                    const newFinalUser = await newUser.save()
               
                    loggerAutentication.debug(newFinalUser)
                    // Users.insert({
                    //      lastToken:token,
                    //      email:decodedIdToken.email,
                    //      uid:decodedIdToken.uid,
                    //      photo:decodedIdToken.photo,
                    //      random_code: (Math.floor(Math.random() * (99999 - 11111)) + 11111),
                    //      birthday:Date()
                    //     })
                    loggerAutentication.info("Create Auth Token User")
                    return await getUserToken(token)                       
                    // throw new Error("Por favor crea un usuario");
                }
            } else {
                loggerAutentication.error("Ubo un error al crear el usuario")
                throw new Error("Error To Firebase");
            }

        } catch (err){
            loggerAutentication.error("Ubo un error al verificar el token:"+err)
            throw new Error("Not Autorize token!"+err);
        }

    } else {
        return {
            autenticate:false,
            id:undefined,
            email:undefined,
            roles: ["UNDEFINED"]        
        }
    }
}