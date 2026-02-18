import express from "express";
import { fetchUserData, registrationController } from "../controllers/user.controller.js";
const router = express.Router();


router.route('/registration').post(registrationController);
router.route("/get-users").get(fetchUserData);

export default router;
