import express from "express";
import { router } from './routes/routes.js'
import { AppError } from "./errors/appError.js";
const app = express();

app.use(express.json());

 app.use("/api/v1", router)

 app.all("*", (req,res,next)=>{
  next(new AppError(`can't find the ${req.originalUrl} on this server :(`, 404))

 })

 app.use((err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "fail"
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})




export default app;


