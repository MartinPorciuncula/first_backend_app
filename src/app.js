import express from "express";
import { router } from './routes/routes.js'
const app = express();

app.listen(3100, () => {
  console.log("Server is running on port 3100");
});


app.use(express.json());

 app.use("/api/v1", router)

export default app;


