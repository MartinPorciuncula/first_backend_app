import express from "express";
import { router } from './routes/routes.js'
const app = express();

app.use(express.json());

 app.use("/api/v1", router)

 app.all("*", (req,res,next)=>{
    return res.status(404).json({
        status: "error",
        message:`cant find ${req.originalUrl} on this server`
    })
 })

export default app;


