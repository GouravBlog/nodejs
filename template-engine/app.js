const express = require("express");
const app = express();
const port = 2000;
const path = require("path");
const hbs = require("hbs");

const templatePath = path.join(__dirname, "./template/src/views");
const partialsPath = path.join(__dirname, "./template/src/partials");

app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);
app.set("views", templatePath);

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/about", (req, res) => {
    res.render("about")
});

// app.get("/help*", (req, res) => {
//     res.render("404", { errorComment: "Page Not Found" });
// })
app.use((req, res) => {
    res.render("404", { errorComment: "Page Not Found ..........." });
});

app.listen(port, () => {
    console.log(`server is run`, port);
});