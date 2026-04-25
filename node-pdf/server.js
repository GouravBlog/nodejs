const express = require('express');
const app = express();
const port = 5000;
const puppeteer = require("puppeteer");
const ejs = require("ejs");
const path = require("path");

// ejs middleware
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const htmlContent = `
        <html>
            <head>
                <title>Pdf Genrate</title>
                <style>
                    h1{
                    background-color:red;
                    color:#fff;
                    text-align-center;
                    }
                </style>
            </head>
            <body>
                <h1>New PDF Genrate</h1>
            </body>
        </html>
        `;

        await page.setContent(htmlContent);

        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: {
                top: "20px",
                right: "20px",
                bottom: "30px",
                left: "30px"
            }
        });

        await browser.close();
        res.contentType("application/pdf");
        res.send(pdfBuffer);

    } catch (error) {
        console.log(error);
    }
});

app.get("/genrate-invoice", async (req, res) => {
    try {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const invoiceData = {
            invoiceNumber: "1234",
            customer: "Rahul Chouhan",
            product: "Node js Course",
            price: "99$"
        };

        const htmlContent = await ejs.renderFile(path.join(__dirname, "views", "invoice.ejs"), invoiceData);

        await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,

            displayHeaderFooter: true,

            margin: {
                top: "80px",     // IMPORTANT
                bottom: "80px",  // IMPORTANT
                left: "30px",
                right: "30px"
            },

            headerTemplate: `
        <div style="font-size:20px; width:100%; text-align:center; border-bottom:1px solid black;">
            <span>My Company</span>
        </div>
    `,

            footerTemplate: `
        <div style="font-size:10px; width:100%; text-align:center;">
            <span>Copyright &copy; all right reserved</span>
        </div>
    `
        });

        await browser.close();

        res.contentType("application/pdf");

        res.send(pdfBuffer);


    } catch (error) {
        console.log(error);
    }
});



app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})