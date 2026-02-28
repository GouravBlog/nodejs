import express from "express";
import { forgotPassword, userLogin, userLogout, userProfileController, userRegistration } from "../controller/users.controller.js";
const router = express.Router();
import expressFormidable from "express-formidable";


router.route("/register").post(expressFormidable(), userRegistration);
router.route("/login").post(userLogin);
router.route("/logout").get(userLogout);
router.route("/forgot-password").post(forgotPassword);
router.route("/profile/:id").get(userProfileController);


export default router;