import express from "express";
import { createOrder, findOrders } from "../controller/orders.controller.js";

const router = express.Router();

router.route("/create-order").post(createOrder);
router.route("/fetch-orders").get(findOrders);


export default router;