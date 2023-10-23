import express from "express";
import { router } from './routes/routes.js'
import { AppError } from "./errors/appError.js";
import { globalErrorHandler } from "./errors/error.controller.js";
import { enableCors } from "./plugins/cors.plugin.js";
import { envs } from "./config/enviroments/enviroments.js";
import { enableMorgan } from "./plugins/morgan.plugin.js";
const app = express();

const ACCEPTED_ORIGINS = ["http://localhost:3000","http://localhost:4000"]


app.use(express.json());

if(envs.NODE_ENV === 'development'){
    enableMorgan(app)
  }
  enableCors(app,ACCEPTED_ORIGINS)

 app.use("/api/v1", router)

 app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
  })

 app.use(globalErrorHandler)




export default app;


