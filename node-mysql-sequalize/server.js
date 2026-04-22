const express = require("express");
const app = express();
const port = 3000;
let Contact = require("./models/contact");
let sequelize = require("./models/index");
const { where } = require("sequelize");

sequelize.sync()
    .then(() => console.log('Database,Tables,Created'))
    .catch((err) => console.log(err))

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello")
});


// Get all Users
app.get("/contacts", async (req, res) => {
    try {
        const contact = await Contact.findAll();
        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Get single user
app.get("/contact/:id", async (req, res) => {
    try {
        let contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.json(contact);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

// Create user
app.post("/contacts", async (req, res) => {
    try {
        const email = await Contact.findOne({
            where: {
                email: req.body.email
            }
        });
        if (email) return res.status(400).send({ message: "email id is alrweady exist" });
        const contact = await Contact.create(req.body);

        res.status(201).send(contact);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Update User
app.put("/contact/:id", async (req, res) => {
    try {
        console.log('req.body', req.body);
        let contact = await Contact.findByPk(req.params.id);
        console.log("contact", contact)
        if (!contact) return res.status(404).json({ error: "Contact not found" });

        await contact.update(req.body, { where: { id: req.params.id } });
        const updated_contact = await Contact.findByPk(req.params.id);
        res.status(200).send(updated_contact);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// Delete user
app.delete("/contact/:id", async (req, res) => {
    try {
        let contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ error: "Contact not found" });

        await contact.destroy();
        res.status(200).json({ message: "Contact Deleted", contact });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


app.listen(port, () => {
    console.log(`server is run at port no. ${port}`);
})