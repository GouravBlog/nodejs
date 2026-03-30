require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const expressSession = require("express-session");
const passport = require("passport");
require("./app/google");

app.use(expressSession({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send('<a href="/auth/google">Go To Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google',
        {
            failureRedirect: '/',
            successRedirect: "/profile"
        }
    ),
);

function checkAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
}

app.get("/profile", checkAuth, (req, res) => {
    console.log("photos", req.user.photos[0].value);
    res.send(`<h2>User Name Is ${req.user.displayName}</h2>
        <img src="${req.user.photos[0].value}" alt="Google Image"/>
        <a href="/logout">Logout</a>
        `);
});

app.get("/logout", (req, res) => {
    req.logOut(() => {
        res.redirect("/");
    })
})


app.listen(port, () => {
    console.log(`server is run at port no. ${port}`);
});