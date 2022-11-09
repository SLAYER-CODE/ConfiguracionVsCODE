import { Request,Response,Router } from "express";
import fs from "fs"
class indexRouters{
    router:Router;
    constructor(){
        this.router = Router()
        this.routers()
    }
    routers(){
        this.router.get('/rest/',(req,res) => res.send("Hola"))
        
        let rawdata = fs.readFileSync('/home/slayer/Cicada333Android/Senati/ServerTypescriptA1/src/Routes/csvjson.json').toString();
        // console.log(JSON.parse(rawdata))
        this.router.get('/peru/',(req,res) => res.send(

            res.json(JSON.parse(rawdata))
            
        ))

        this.router.get("/images/",(req,res)=>{
            
        })
    }
}

const IndexRouters = new indexRouters();
IndexRouters.routers();

export default IndexRouters.router;


