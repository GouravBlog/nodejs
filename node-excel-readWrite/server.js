const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");
const XLSX = require("xlsx");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs");

const uploads = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/")
        }
    })
});

app.get("/", (req, res) => {
    res.render("upload");
})

app.post("/upload-excel", uploads.single("excelFile"), (req, res) => {
    try {
        const filePath = path.join(__dirname, "uploads", req.file.filename);

        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        res.json({
            message: "Excel File Uploaded Succesfully",
            data
        });
    } catch (error) {
        console.log("Err :", error);
    }
});


app.get("/export-excel", (req, res) => {
    try {
        const data = [
            { name: "Vishal rajput", age: 22 },
            { name: "Ram", age: 25 },
            { name: "Shyam", age: 20 },
            { name: "Raju", age: 26 },
        ];

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: 'buffer' });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", 'attachment;filename=data.xlsx');
        res.send(excelBuffer);

    } catch (error) {
        console.log(error);
    }
})






app.listen(port, () => {
    console.log('server is run at port no:', port);
})