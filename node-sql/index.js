const express = require("express");
const app = express();
const port = 5000;
const mysql = require("mysql2");

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// dbconnection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactsdb"
});

db.connect((err) => {
    if (err) {
        console.log('Error Connection ' + err.stack)
        return;
    }
    console.log('MySQL Connected')
})

// get all Users
app.get("/contacts", async (req, res) => {
    db.query("SELECT * FROM contact", (err, rows) => {
        if (err) return res.status(500).send(err);
        res.send(rows);
    })
});

// read single data
app.get("/contacts/:id", async (req, res) => {
    db.query("SELECT * FROM contact WHERE id=?", [req.params.id], (err, row) => {
        if (err) return res.status(500).send(err);
        if (row.length === 0) return res.status(404).send({ message: "contact not found" });
        res.send(row[0]);
    })
});

// Create User
app.post("/contacts", async (req, res) => {
    const { firstname, lastname, email, phone, address } = req.body;

    const sql = "INSERT INTO contact (firstname,lastname,email,phone,address) VALUES (?,?,?,?,?)";

    db.query(sql, [firstname, lastname, email, phone, address], (err, result) => {
        if (err) return res.status(500).send(err)

        res.send({
            message: "Contact created",
            id: result.insertId
        })
    });
});

// Update Contact
app.put("/contacts/:id", async (req, res) => {
    const { firstname, lastname, email, phone, address } = req.body;

    const sql = "UPDATE contact SET firstname=?, lastname=?, email=?, phone=?, address=? WHERE id =?";

    db.query(sql, [firstname, lastname, email, phone, address, req.params.id], (err, result) => {
        if (err) return res.status(500).send(err)

        if (result.affectedRows === 0) return res.status(404).send({ message: "contact not found" })

        res.send({
            message: "Contact Updated"
        })
    })
});

// delete contact
app.delete("/contacts/:id", async (req, res) => {
    db.query("DELETE FROM contact WHERE id=?",[req.params.id],(err,result)=>{
        if (err) return res.status(500).send(err);

        if(result.affectedRows === 0) return res.status(404).send({message:"contact not found"});

        res.send({message:"contact deleted"});

    })
});


app.listen(port, () => {
    console.log(`server is run at port no. ${port}`);
})