import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 9000;
import connectionDB from "./config/dbConfig.js";
import userRouter from "./routes/user.route.js";
import cors from "cors";

// Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/", userRouter);

app.listen(port, () => {
    connectionDB(process.env.MONGO_URL);
    console.log(`server is running at port no ${port}`);
});