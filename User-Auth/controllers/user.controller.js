import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//User Registration
export const userRegistration = async (req, res) => {
    try {
        let { fullname, email, password, number } = req.body;

        if (!fullname || !email || !password || !number) {
            return res.status(400).send({ message: "all fileds are required" });
        }

        let checkUser = await userModel.findOne({ email: email });

        if (checkUser) {
            return res.status(200).send({ message: "User already registered this email please login" })
        }

        let hashPassword = await bcrypt.hash(password, 10);

        let user = new userModel({
            fullname: fullname,
            email: email,
            password: hashPassword,
            number: number
        });

        user = await user.save();

        res.status(201).send({ message: "User Registartion Succesfully", user });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "User Registration Error", error: error.message });
    }
}

// User Login
export const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        let matchUser = await userModel.findOne({ email: email });

        if (!matchUser) {
            return res.status(400).send({ message: "User Not registered With this email" });
        }

        let comparePassword = await bcrypt.compare(password, matchUser.password);

        if (!comparePassword) {
            return res.status(400).send({ message: "Password is incorrect" });
        }


        let token = jwt.sign({ _id: matchUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        });

        res.status(200).send({ message: "User Login Succesfully", user: matchUser, token });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: "User Login Error", error: error.message });
    }
}

