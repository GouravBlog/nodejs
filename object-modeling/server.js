import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
const port = process.env.PORT || 9000;
import dbConnection from "./config/dbConfig.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/products.routes.js";
import orderRouter from "./routes/order.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";


// Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth/", userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);


app.listen(port, () => {
    dbConnection(process.env.MONGO_URL)
    console.log(`server is running at port no. ${port}`);
})