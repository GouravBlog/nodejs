require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbConnection = require("./config/dbConfig");
const mongoose = require("mongoose");

const contacts = require("./models/user.models")


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        // let Con = await contacts.find();

        let { page = 1, limit = 2 } = req.query;

        let options = {
            page: parseInt(page),
            limit: parseInt(limit)
        }
        let result = await contacts.paginate({}, options);
        // res.send(result);
        // console.log("c", Con)
        if (!result.docs) {
            return res.render("404", { message: "Users Not Found " })
        }
        res.render("showContacts", {
            title: "Show-Contact-Details", message: "User-Details",
            totalDocs: result.totalDocs,
            limit: result.limit,
            totalPages: result.totalPages,
            currentPage: result.page,
            counter: result.pagingCounter,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            Con: result.docs
        })



    } catch (error) {
        console.log(error)
        res.render("500", { message: error })
    }
});

app.get("/show-contact/:id", async (req, res) => {
    try {
        let paramsId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!paramsId) {
            return res.render("404", { message: "User Not Found This ID" })
        }
        let user = await contacts.findById(req.params.id);
        res.render("singleContact", { user });
    } catch (error) {
        console.log(error)
        res.render("500", { message: error })
    }
});

app.get("/add-contact", async (req, res) => {
    try {
        res.render("addContact", { title: "Add User" });
    } catch (error) {
        console.log(error)
        res.render("500", { message: error })
    }
});

app.post("/add-contact", async (req, res) => {
    try {
        let { first_name, last_name, email, mobile, address } = req.body;
        await contacts.insertOne({
            first_name: first_name,
            last_name: last_name,
            email: email,
            mobile: mobile,
            address: address,
        });
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.render("500", { message: error })
    }
});

app.get("/update-contact/:id", async (req, res) => {
    try {
        let paramsId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!paramsId) {
            return res.render("404", { message: "User Not Found This ID" })
        }
        let con = await contacts.findById(req.params.id);
        res.render("updateContact", { con, title: "Update-Contact-Details", message: "User-Details" })
    } catch (error) {
        console.log(error)
        res.render("500", { message: error })
    }
});

app.post("/update-contact/:id", async (req, res) => {
    try {
        await contacts.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.render("500", { message: error })
    }
});

app.get("/delete-contact/:id", async (req, res) => {
    try {
        let paramsId = mongoose.Types.ObjectId.isValid(req.params.id);
        if (!paramsId) {
            return res.render("404", { message: "User Not Found This ID" })
        }
        await contacts.findByIdAndDelete(req.params.id);
        res.redirect("/")
    } catch (error) {
        console.log(error)
        res.render("500", { message: error })
    }
});


dbConnection(process.env.MONGO_URI);
app.listen(port, () => {
    console.log(`server is run at port no. ${port}`);
})