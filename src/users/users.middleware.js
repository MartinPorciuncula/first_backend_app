import { envs } from "../config/enviroments/enviroments.js";
import { UserServices } from "./users_service.js";
import  jwt  from "jsonwebtoken";
import {promisify} from "util"
 
const userService = new UserServices()

export const ValidateExistingUser = async (req,res,next) => {
    const { id } = req.params;
      
      const user = await userService.findOneUser(id)
      
  
      if(!user){
        return res.status(404).json({
          status: 'error',
          message: `passenger with id ${ id } not found`
        })
      }

     req.user = user
      next()
}

export const protect = async (req,res,next) =>{

 let token;

if(
  req.headers.authorization &&
  res.headers.authorization.startsWith("bearer")
){
  token = req.headers.authorization.split(" ")[1];
}

if(!token){
  return res.status(401).json({
    status:"error",
    message:"You are not logged in,please log in to continue <3"
  })
}

const decoded = await promisify (jwt.verify)(token,envs.SECRET_JWD_SEED)
}