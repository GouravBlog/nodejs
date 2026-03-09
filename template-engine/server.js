// import express from "express";
const express = require("express");
const app = express();
const port = 2000;
// import path from "path";
const path = require("path");

const staticPath = path.join(__dirname, "./public");

app.use(express.static(staticPath));

// app.get("/", (req, res) => {
//     res.send("Api Server Running")
// })


app.listen(port, () => {
    console.log(`server is runnig at port no. ${port}`);
})