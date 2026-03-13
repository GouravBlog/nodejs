import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 2000;
import dbConnection from "./config/dbConfig.js";
import userRouter from "./routes/user.routs.js"
import cors from "cors";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(userRouter);


app.listen(port, () => {
    dbConnection();
    console.log(`server is run at port ${port}`);
})


