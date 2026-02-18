import mongoose from "mongoose";

export default function connectionDB(url) {
    try {
        mongoose.connect(url).then(() => {
            console.log('Mongodb Is Connected');
        })
    } catch (error) {
        console.log(error);
    }
}

// export default connectionDB;