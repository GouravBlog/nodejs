import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const requireSignIn = async (req, res, next) => {
    try {
        let { token } = req.cookies;
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        if (!decode) {
            res.send({ message: "Unauthorized user" });
        }
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.send({ message: "User Middleware Error" })
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        let { _id } = req.user;
        let user = await userModel.findById(_id);
        if (user.role !== "admin") {
            return res.send({ message: "Only admin access" });
        }
        next();
    } catch (error) {
        console.log(error);
        res.send({ message: "Admin Middleware Error" })
    }
}