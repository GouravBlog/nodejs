import express from "express";
import { userLogin, userLogout, userRegistration } from "../controllers/auth.controller.js";
const router = express.Router();


router.route("/signup").post(userRegistration);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);

export default router;