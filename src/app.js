import express from "express";
import { router } from './routes/routes.js'
import { AppError } from "./errors/appError.js";
import { globalErrorHandler } from "./errors/error.controller.js";
import { enableCors } from "./plugins/cors.plugin.js";
const app = express();

app.use(express.json());
const ACCEPTED_ORIGINS = ["http://localhost:3000","http://localhost:4000"]
enableCors(app,ACCEPTED_ORIGINS)

 app.use("/api/v1", router)

 app.all("*", (req,res,next)=>{
  next(new AppError(`can't find the ${req.originalUrl} on this server :(`, 404))

 })

 app.use(globalErrorHandler)




export default app;


