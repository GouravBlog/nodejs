import express from "express";
import { userRegistration } from "../controller/users.controller.js";
const router = express.Router();


router.route("/register").post(userRegistration);

export default router;