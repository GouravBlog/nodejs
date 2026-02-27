import express from "express";
import { createProduct, findProducts } from "../controller/products.controller.js";

const router = express.Router();


router.route("/create-product").post(createProduct);
router.route('/fetch-products').get(findProducts);


export default router;