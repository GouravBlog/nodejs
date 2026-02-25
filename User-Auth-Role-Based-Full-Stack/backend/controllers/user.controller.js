import userModel from "../models/user.model.js";

// Get All Users for admin || GET Method
export const getAllUsers = async (req, res) => {
    try {
        let users = await userModel.find();
        if (!users) {
            return res.send({ message: "no users found" });
        }
        res.status(200).send({ message: "user data fetch succesfully", total: users.length, users });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "User data fetch Error", error: error.message });
    }
}

// Get Single User for user || GET Method
export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await userModel.findById(id);
        res.status(200).send({ message: "user data found", user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "single User data fetch Error", error: error.message });
    }
}