import mongoose from "mongoose";

async function connectionDB(url) {
    try {
        await mongoose.connect(url);
        console.log('database is connected')
    } catch (error) {
        console.log(error.message);
    }
}

export default connectionDB;