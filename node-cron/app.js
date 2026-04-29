const express = require("express");
const app = express();
const port = 6000;
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "data");
const backupDir = path.join(__dirname, "backups");

app.get("/", (req, res) => {
    res.send("Hello World");
});


cron.schedule("* * * * *", async (req, res) => {
    try {
        let timeStamp = new Date().toISOString().replace(/[:.]/g, "-");
        const destination = path.join(backupDir, `backup-${timeStamp}`);

        await fs.cp(sourceDir, destination, { recursive: true }, (err) => {
            if (err) {
                console.log("Backup Failed :", err)
            } else {
                console.log(`Backup Created at ${destination}`);
            }
        })
    } catch (error) {
        console.log("Backup Failed : ", error);
    }
});

// cron.schedule("* * * * * *",()=>{
//     console.log('this task is runs every minute')
// });








app.listen(port, () => {
    console.log(`server is running at port no. ${port}`);
})