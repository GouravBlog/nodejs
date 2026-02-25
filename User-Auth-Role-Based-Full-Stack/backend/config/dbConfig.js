import mongoose from "mongoose";

export default function connectionDB(url) {
    try {
        mongoose.connect(url).then(() => {
            console.log('database is connected');
        })
    } catch (error) {
        console.log(error);
    }
};