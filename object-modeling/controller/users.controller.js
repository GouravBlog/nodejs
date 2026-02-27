import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const userRegistration = async (req, res) => {
    try {
        let { fullname, email, password, mob } = req.body;
        if (!fullname || !email || !password || !mob) {
            res.status(401).send({ status: false, messgae: 'all fileds are required' });
        }

        let exist_user = await userModel.findOne({ email: email });

        if (exist_user) {
            res.status(200).send({ status: true, messgae: 'user already registered please login' });
        }

        let password_hash = await bcrypt.hash(password, 10);

        let user = new userModel({ fullname, email, password: password_hash, mob });

        user = await user.save();

        res.status(201).send({ status: true, messgae: 'user registration succesfully', user });

    } catch (error) {
        console.log(error);
        res.status(400).send({ status: false, messgae: 'user registration', error: error.messgae });
    }
}