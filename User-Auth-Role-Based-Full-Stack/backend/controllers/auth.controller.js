import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration || POST Method
export const userRegistration = async (req, res) => {
    try {
        let { username, email, password, address, mob } = req.body;

        if (!username || !email || !password || !address || !mob) {
            return res.status(401).send({ message: "all fileds are required" });
        }

        const alreadyExist = await userModel.findOne({ email: email });

        if (alreadyExist) {
            return res.status(403).send({ message: "User already registered please login" });
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let user = new userModel({ username, email, password: hashPassword, address, mob });

        user = await user.save();

        res.status(201).send({ message: "user Registration succesfully", user });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "User registration Error", error: error.message });
    }
}


// User Login || POST Method
export const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).send({ message: "all fileds are required" });
        }


        const alreadyExist = await userModel.findOne({ email: email });

        if (!alreadyExist) {
            return res.status(403).send({ message: "User Not  registered with this email please register" });
        }

        let comparePassword = await bcrypt.compare(password, alreadyExist.password);
        if (!comparePassword) {
            return res.status(401).send({ message: "Password is incorrect" });
        }


        let token = jwt.sign({ _id: alreadyExist._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie("token", token);

        res.status(200).send({ message: "user login succesfully", user: alreadyExist, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "User Login Error", error: error.message });
    }
}


// User Logout || Get Method

export const userLogout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.send({ message: "User Logout Succesfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "User Logout Error", error: error.message });
    }
}
