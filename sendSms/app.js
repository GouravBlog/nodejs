// require("dotenv").config();
// const express = require('express');
import dotenv from "dotenv";
dotenv.config();
import express from 'express';
const app = express();
const port = process.env.PORT;
import twilio from 'twilio';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

let client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.get("/", (req, res) => {
    try {
        res.render("sendSms");
    } catch (error) {
        console.log(error);
    }
})

app.post("/send-sms", async (req, res) => {
    try {
        let { message, to } = req.body;

        let result = await client.messages.create({
            body: message,
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER,
        });

        res.status(200).send({ sid: result.accountSid, message: "Sent SMS Succesfully", result });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Send Message Error", error: error.message });
    }
})

app.listen(port, () => {
    console.log("server is run", port);
})