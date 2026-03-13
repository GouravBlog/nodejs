import mongoose from "mongoose";

export default async function dbConnection() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database is connected");
    } catch (error) {
        console.log(error.message);
    }
}