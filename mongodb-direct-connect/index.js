const dbConnect = require("./mongodb/connect");
const mongodb = require("mongodb");
const express = require("express");
const app = express();
const port = 2000;
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors());

app.get("/get-users", async (req, res) => {
    try {
        let result = await dbConnect();
        result = await result.find().toArray();
        res.json(result)
        //    console.log(result)
    } catch (error) {
        console.log(error.message);
    }
});

app.get("/get-user/:id", async (req, res) => {
    try {
        let result = await dbConnect();
        result = await result.findOne({
            _id: new mongodb.ObjectId(req.params.id)
        });
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/insertData", async (req, res) => {
    try {
        let result = await dbConnect();
        result = await result.insertOne(req.body);
        res.status(201).send(result)
        console.log(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Insert data error", error: error })
    }
});

app.put("/update-data/:id", async (req, res) => {
    try {
        let result = await dbConnect();
        result = await result.updateOne(
            { _id: new mongodb.ObjectId(req.params.id) },
            { $set: req.body }
        );
        res.status(201).send(result)
        console.log(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Update data error", error: error })
    }
})

app.delete("/delete-data/:id", async (req, res) => {
    try {
        let result = await dbConnect();
        result = await result.deleteOne({
            _id: new mongodb.ObjectId(req.params.id)
        });
        res.status(201).send(result)
        console.log(result)
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "delete data error", error: error })
    }
});



app.listen(port, () => {
    console.log(`server is runnig port ${port}`);
})


// async function get() {
//     try {
//         let result = await dbConnect();
//         result = await result.find().toArray();
//         console.log("result", result);
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function insertData() {
//     try {
//         let result = await dbConnect();
//         // result = await result.insertMany([
//         //     {
//         //         _id : 1,
//         //         name : "Vishal Rajput",
//         //         age : 23
//         //     },
//         //     {
//         //         _id:2,
//         //         name : "Shani Yadav",
//         //         age :50
//         //     }
//         // ]);
//         result = await result.insertMany([
//             {
//                 name: "Boby Deol",
//                 age: 53
//             },
//         ]);
//         if (result.acknowledged) {
//             console.log('data is inserted')
//         }
//     } catch (error) {
//         console.log("err", error);
//     }
// }

// async function singleData() {
//     try {
//         let result = await dbConnect();
//         // result = await result.findOne({
//         //     _id : 2
//         // });
//         result = await result.findOne({
//             _id: new mongodb.ObjectId("69d5fda0e598142b16c40177")
//         });
//         console.log("result", result);
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function updateData() {
//     try {
//         let result = await dbConnect();
//         result = await result.updateOne(
//             { _id: new mongodb.ObjectId("69d5fda0e598142b16c40177") },
//             {
//                 $set: {
//                     name: "Shahid Kapoor"
//                 }
//             }
//         );
//         console.log("result", result);
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function deleteData() {
//     try {
//         let result = await dbConnect();
//         result = await result.deleteOne({ _id: 2 });
//         console.log("result", result)
//     } catch (error) {
//         console.log(error)
//     }
// }

// get();
// insertData();
// singleData();
// updateData();
// deleteData();