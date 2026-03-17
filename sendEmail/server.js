require("./controllers/env")
const port = process.env.PORT;
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

// let template = fs.readFile("./")
// let html = res.render(template, { name: "kldsnc" })


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "gouravvasale@gmail.com",
        pass: "dveeukwxrquueozo"
    },
});

console.log('transporter', transporter.auth);

app.get('/', (req, res) => {
    res.render("sendMail")
})

// Send Email Route
app.post("/send-email", async (req, res) => {
    try {
        let { subject, to, text } = req.body;

        let info = await transporter.sendMail({
            from: '"Gourav Wasale" <gouravvasale@gmail.com>',
            subject: subject,
            to: to,
            text: text,
            // html: html,
            attachments: [
                {
                    filename: "abc.pdf",
                    path: path.join(__dirname, "data", "abc.pdf")
                }
            ]
        });

        res.status(200).send({ message: "Email Sent Succesfully", info });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Email Send Failed" });
    }
})
const { join, resolve, basename } = require('path');

console.log("join", join);
console.log("resolve", resolve);
console.log("basename", basename);


app.listen(port, () => {
    console.log('server is running at port', port);
})


