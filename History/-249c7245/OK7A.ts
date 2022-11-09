import * as admin from 'firebase-admin';
import { userAutenticate } from '../Context';
import { UsersInput } from '../resolvers/UserResolvers';

// Importando los modelos para ser representados en este servidor
import { ListWish,ShoppingCart } from '../entity/Shoping';
import { Phone,Users } from '../entity/Users';

export async function getUserToken(token: string | undefined):Promise<userAutenticate> {
    // console.log(token)
    if (token != undefined) {
        try {
            const decodedIdToken = await admin.auth().verifyIdToken(token)

            if (decodedIdToken != undefined) {
                const user = await Users.findOne({ where: {uid:decodedIdToken.uid} })
                if(user!=undefined) {
                    return {
                        autenticate:true,
                        id:decodedIdToken.uid,
                        email:decodedIdToken.email,
                        roles: ["USER"]
                    }
                }else{
                    const newUser =  Users.create({
                        lastToken:token,
                        email:decodedIdToken.email,
                        uid:decodedIdToken.uid,
                        photo:decodedIdToken.photo,
                        random_code: (Math.floor(Math.random() * (99999 - 11111)) + 11111),
                        birthday:Date()
                       })

                    newUser.phone_id=await Phone.create({country_code:"primero",phone_number:decodedIdToken.phone_number})
                    
                    newUser.wish_id=[await ListWish.create()]

                    newUser.shoppingCardt_id=await ShoppingCart.create()
                    const newFinalUser = await newUser.save()
               
                    console.log(newFinalUser)
                    // Users.insert({
                    //      lastToken:token,
                    //      email:decodedIdToken.email,
                    //      uid:decodedIdToken.uid,
                    //      photo:decodedIdToken.photo,
                    //      random_code: (Math.floor(Math.random() * (99999 - 11111)) + 11111),
                    //      birthday:Date()
                    //     })
                    console.log("Create Auth Token User")
                    return await getUserToken(token)                       
                    // throw new Error("Por favor crea un usuario");
                }
            } else {
                throw new Error("Error To Firebase");
            }

        } catch (err){
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