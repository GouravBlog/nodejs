import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

export const userRegistration = async (req, res) => {
    try {
        // let { fullname, email, password, mob } = req.body;
        let { fullname, email, password, mob } = req.fields;
        let { photo } = req.files;

        if (!fullname || !email || !password || !mob) {
            res.status(401).send({ status: false, messgae: 'all fileds are required' });
        }

        let exist_user = await userModel.findOne({ email: email });

        if (exist_user) {
            res.status(200).send({ status: true, messgae: 'user already registered please login' });
        }

        let password_hash = await bcrypt.hash(password, 10);

        let user = new userModel({ ...req.fields, password: password_hash });

        user.photo.data = fs.readFileSync(photo.path);
        user.photo.contentType = photo.type

        user = await user.save();

        res.status(201).send({ status: true, messgae: 'user registration succesfully', user });

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, messgae: 'user registration', error: error.messgae });
    }
}

export const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            res.status(401).send({ status: false, messgae: 'all fileds are required' });
        }

        let exist_user = await userModel.findOne({ email: email }).select("-photo");

        if (!exist_user) {
            res.status(200).send({ status: false, messgae: 'user is not login please registered' });
        }

        let verifyPassword = await bcrypt.compare(password, exist_user.password);

        if (!verifyPassword) {
            res.status(200).send({ status: false, messgae: 'Password are not matched' });
        }

        let token = jwt.sign({ _id: exist_user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            samSite: "lax",
            maxAge: 60 * 60 * 1000
        })

        res.status(200).send({ status: true, messgae: 'user Login Succesfully', user: exist_user, token, });

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, messgae: 'user registration', error: error.messgae });
    }
}

export const userLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send({ status: true, messgae: 'user Logout Succesfully' });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, messgae: 'Logout Failed', error: error.messgae });
    }
}



export const forgotPassword = async (req, res) => {
    try {
        let { email, newPassword } = req.body;

        if (!email) {
            res.status(401).send({ status: false, messgae: 'Email ID is required' });
        }

        let exist_user = await userModel.findOne({ email: email }).select("-photo");

        if (!exist_user) {
            res.status(200).send({ status: false, messgae: 'user is not registered this email id' });
        }

        let oldVerifyPassword = await bcrypt.compare(newPassword, exist_user.password);

        if (oldVerifyPassword) {
            res.status(401).send({ status: false, messgae: 'new password  should be unique from the old one' });
        }

        let hashPassword = await bcrypt.hash(newPassword, 10);

        let user = await userModel.findByIdAndUpdate({ _id: exist_user._id }, { password: hashPassword }, { new: true });

        user = await user.save();

        res.status(200).send({ status: true, messgae: 'forgot Password Succesfully', user });

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, messgae: 'user registration', error: error.messgae });
    }
}

export const userProfileController = async (req, res) => {
    try {
        let { id } = req.params
        let user = await userModel.findById(id).select("-photo");
        if (!user) {
            res.status(401).send({ status: false, messgae: 'User are not exist' });
        }
        res.status(299).send({ status: true, messgae: 'user profile fetch succesfully', user });
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, messgae: 'user registration', error: error.messgae });
    }
}

export const userProfilePictureController = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await userModel.findById(id).select("photo");
        if (!user) {
            return res.status(401).send({ status: false, messgae: 'User data not found' });
        }
        if (user.photo.data) {
            res.set("Content-Type", user.photo.contentType);
            res.status(200).send(user.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, messgae: 'user Profile Picture Error', error: error.messgae });
    }
}

// export const checkAuth = async (req, res) => {
//     try {
//         let token = req.cookies.token;
//         console.log("token", token);

//         let decode = jwt.verify(token, process.env.JWT_SECRET);

//         if (!decode) {
//             return res.status(200).send({ status: true, userLogedIn: false, message: "Unautohorized User" });
//         }

//         req.user = decode;

//         let user = await userModel.findById(decode._id).select("-photo");

//         res.status(200).send({ status: true, message: "User authentication succesfully", userLogedIn: true, user, token });
//     } catch (error) {
//         console.log(error.messgae);
//         res.status(400).send({ status: false, userLogedIn: false })
//     }
// }


export const checkAuth = async (req, res) => {
    try {

        let token = req.cookies.token;

        if (!token) {
            return res.status(200).send({
                status: true,
                userLogedIn: false,
                message: "User not logged in"
            });
        }

        let decode = jwt.verify(token, process.env.JWT_SECRET);

        let user = await userModel.findById(decode._id).select("-photo");

        res.status(200).send({
            status: true,
            message: "User authenticated successfully",
            userLogedIn: true,
            user,
            token
        });

    } catch (error) {

        res.status(200).send({
            status: false,
            userLogedIn: false,
            message: "Unauthorized User"
        });
    }
}