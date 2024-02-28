import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors"
import rootRouter from "./routes/rootRoutes";
import dotenv from "dotenv"
dotenv.config()
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

rootRouter(app)

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});