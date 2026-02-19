import express from "express";
const router = express.Router();

import { userLogin, userRegistration } from "../controllers/user.controller.js";
import { requireSignin } from "../middlewares/user.middleware.js";

router.route("/registration").post(userRegistration);

router.route("/login").post(userLogin);

router.route("/user").get(requireSignin, function (req, res) {
    console.log("user Route");
    res.send({ message: "User Route" });
});



export default router;