//import { Users } from "./entity/Business";
import { Users } from "./entity/Users";

export interface userAutenticate{
    id:string|undefined;
    email:string|undefined;
    autenticate:boolean;
    roles:["UNDEFINED"|"USER"|"USERPREMIUN"|"ADMIN"|"ROOT"]
}


export interface ContextAuth{
    user:userAutenticate
    req:any;
}

export interface Context {
    user?: Users;
}
