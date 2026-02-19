// const http = require("http");

// const data = [
//     { name: "Rahul", age: 20 },
//     { name: "Rahul", age: 20 },
//     { name: "Rahul", age: 20 },
//     { name: "Rahul", age: 20 },
//     { name: "Rahul", age: 20 }
// ]

// http.createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(data));
// }).listen(4000, () => {
//     console.log('server is running');
// });

// ----------------------------------------------------------------------------------------

const express = require("express");
const app = express();
const port = 9000;

const data = [
    { name: "Rahul", age: 20 },
    { name: "Rahul", age: 20 },
    { name: "Rahul", age: 20 },
    { name: "Rahul", age: 20 },
    { name: "Rahul", age: 20 }
]

// Middleware


app.get("/", function (req, res) {
    // res.send("New Express Server");
    res.json(data);
});


app.use(function (req, res, next) {
    next()
});


app.get();



app.listen(port, () => {
    console.log(`server is running ${port}`);
});