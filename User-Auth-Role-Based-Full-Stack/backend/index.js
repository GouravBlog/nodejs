import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 3000;
import connectionDB from "./config/dbConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    { origin: "http://localhost:5174", credentials: true }
));

app.use("/api/auth/", authRoutes);
app.use("/api/user/", userRoutes);



app.listen(port, () => {
    connectionDB(process.env.MONGO_URL);
    console.log(`server is runnig at port no.${port}`);
})




