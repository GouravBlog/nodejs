const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
let db = "Simple-mongo";
let client = new MongoClient(url);



async function dbConnect() {
    try {
        let result = await client.connect();
        let database = result.db(db);
        let collection = database.collection("users")
        return collection;
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;