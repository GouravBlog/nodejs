require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const multer = require("multer");
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        let myFileName = Date.now() + path.extname(file.originalname);
        cb(null, myFileName);
    }
});

const limit = {
    fileSize: 1024 * 1024 * 3  // 3 mb
}

// Pdf File Filter
// const fileFilter = (req, file, cb) => {

//     if (file.mimetype.startsWith("application/pdf")) {
//         cb(null, true);
//     } else {
//         cb(new Error("only pdf file selected"));
//     }
// };


//multiple formate filter
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
//         cb(null, true);
//     } else {
//         cb(new Error("only png and jpg file selected"));
//     }
// };

//multiple formate filter
const fileFilter = (req, file, cb) => {
    if (file.fieldname == "userfile") {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(new Error("only png and jpg file selected"));
        }
    } else if (file.fieldname == "userDocuments") {
        if (file.mimetype.startsWith("application/pdf")) {
            cb(null, true);
        } else {
            cb(new Error("only pdf file selected"));
        }
    } else {
        cb(new Error("Multer Err"))
    }

};

const uploads = multer({
    storage: storage,
    limits: limit,
    fileFilter: fileFilter
});

app.get("/", async (req, res) => {
    res.render("form");
})


// multer upload single file
// app.post("/register", uploads.single("userfile"), async (req, res) => {
//     res.send(req.file);
// });

// app.post("/register", uploads.array("userfile", 3), async (req, res) => {
//     res.send(req.files);
// });

app.post("/register", uploads.fields([
    { name: "userfile", maxCount: 2 },
    { name: "userDocuments", maxCount: 3 }
]), async (req, res) => {
    res.send(req.files);
});


app.listen(port, () => {
    console.log(`server is run at port ${port}`);
});