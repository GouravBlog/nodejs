import userModel from "../models/user.model.js";


export async function registrationController(req, res) {
    try {
        let user = new userModel(req.body);
        user = await user.save();
        return res.status(201).send({ message: "user registartion succesfully", user });
    } catch (error) {
        console.log(error);
    }
}

export async function fetchUserData(req, res) {
    try {
        let users = await userModel.find();
        res.status(200).send({ message: "users find succesfully", users });
    } catch (error) {
        console.log(error)
    }
}