import express from "express";
import { router } from './routes/routes.js'
import { AppError } from "./errors/appError.js";
import { globalErrorHandler } from "./errors/error.controller.js";
const app = express();

app.use(express.json());

 app.use("/api/v1", router)

 app.all("*", (req,res,next)=>{
  next(new AppError(`can't find the ${req.originalUrl} on this server :(`, 404))

 })

 app.use(globalErrorHandler)




export default app;


