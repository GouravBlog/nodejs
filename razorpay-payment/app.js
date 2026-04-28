require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const Razorpay = require('razorpay');
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");
const path = require('path');
const crypto = require("crypto");


// middleware
app.use(express.json());
app.set('view engine', 'ejs');

const razoray = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});


app.get('/', (req, res) => {
    res.render('index', { key: process.env.RAZORPAY_API_KEY });
});


app.post('/create-order', async (req, res) => {
    try {
        const options = {
            amount: req.body.amount * 100,
            currency: 'INR',
            // receipt = `receipt_ ${Date.now()}`
            receipt: `receipt_${Date.now()}`
        }

        const order = await razoray.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send({ err: error });
    }
});


// app.post("/verify-payment", async (req, res) => {
//     try {
//         const { razoray_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//         const secret = process.env.RAZORPAY_API_SECRET;
//         const body = razoray_order_id + "|" + razorpay_payment_id;

//         const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);

//         if (isValidSignature) {
//             res.status(200).json({ status: 'ok' });
//             console.log("Payment Verification Succesfully");
//         } else {
//             res.status(400).send({ status: "verification Faild" });
//             console.log("payment verification failed")
//         }
//     } catch (error) {
//         res.status(500).send({ err: error });
//     }
// });

app.post("/verify-payment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            console.log("✅ Payment Verified Successfully");
            res.status(200).json({ status: "ok" });
        } else {
            console.log("❌ Payment Verification Failed");
            res.status(400).json({ status: "failed" });
        }
    } catch (error) {
        res.status(500).send({ err: error });
    }
});


app.get("/payment-success", (req, res) => {
    res.sendFile(path.join(__dirname, "views/success.html"));
});


app.listen(port, () => {
    console.log(`serve is runnig at port no. ${port}`);
});
