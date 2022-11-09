import { AuthChecker } from "type-graphql";
import { Context, ContextAuth, userAutenticate } from "../Context";


    // { root, args, context, info },
// export const autochekercustom: AuthChecker<Context> = (
export const autochekercustom: AuthChecker<ContextAuth> = (
    {context:pwd},
    rolesUser,
  ) => {
    // const resultado = pwd.user?.then((res:userAutenticate)=>{
    //   console.log(res.autenticate)
    //   console.log(res.email)
    // })
    console.log("SE VERIFICO!")
    console.log(rolesUser)
    const resultado:userAutenticate = pwd.user
    console.log(resultado?.autenticate)
    console.log(resultado?.roles)

    if(rolesUser.some(rolesUser=>rolesUser.includes(resultado?.roles[0]))){
      return true
    }
    
    // here we can read the user from context
    // and check his permission in the db against the `roles` argument
    // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  
    return false; // or false if access is denied
  };