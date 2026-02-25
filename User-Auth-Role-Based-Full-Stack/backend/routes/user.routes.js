import express from "express";
import { getAllUsers, getSingleUser } from "../controllers/user.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/user.middlewares.js";
const router = express.Router();

router.route("/all-users").get(requireSignIn, isAdmin, getAllUsers);
router.route("/single-user/:id").get(requireSignIn, getSingleUser);

export default router;