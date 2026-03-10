require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbConnection = require("./config/dbConfig");

const contacts = require("./models/user.models")


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    let Con = await contacts.find();
    res.render("showContacts", { Con, title: "Show-Contact-Details", message: "User-Details" })
});

app.get("/show-contact/:id", async (req, res) => {
    let user = await contacts.findById(req.params.id);
    res.render("singleContact", { user });
});

app.get("/add-contact", async (req, res) => {
    res.render("addContact", { title: "Add User" });
});

app.post("/add-contact", async (req, res) => {
    let { first_name, last_name, email, mobile, address } = req.body;
    await contacts.insertOne({
        first_name: first_name,
        last_name: last_name,
        email: email,
        mobile: mobile,
        address: address,
    });
    res.redirect("/")
});

app.get("/update-contact/:id", async (req, res) => {
    let con = await contacts.findById(req.params.id);
    res.render("updateContact", { con, title: "Update-Contact-Details", message: "User-Details" })
});

app.post("/update-contact/:id", async (req, res) => {
    await contacts.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.redirect("/")
});

app.get("/delete-contact/:id", async (req, res) => {
    await contacts.findByIdAndDelete(req.params.id);
    res.redirect("/")
});


dbConnection(process.env.MONGO_URI);
app.listen(port, () => {
    console.log(`server is run at port no. ${port}`);
})