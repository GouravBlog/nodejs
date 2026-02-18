import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT;
import connectionDB from "./config/dbConfig.js";
import userRouter from "./routes/user.routes.js";



// Middleware
app.use(express.json());
app.use("/api/", userRouter);



app.listen(port, () => {
    connectionDB(process.env.MONGO_URL);
    console.log(`server is running at port no. ${port}`);
})





