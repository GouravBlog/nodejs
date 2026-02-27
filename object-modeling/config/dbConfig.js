import mongoose from "mongoose";

export default async function dbConnection(url) {
    try {
        await mongoose.connect(url);
        console.log('database is connected');
    } catch (error) {
        console.log(error);
    }
}