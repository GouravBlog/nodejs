import express from "express";
const router = express.Router();
import multer from "multer";
import cloudinary from "../helper/cloudinary.config.js";
import userModel from "../models/user.models.js";
import moment from 'moment'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        let myFileName = `image-${Date.now()}.${file.originalname}`;
        cb(null, myFileName);
    }
});

const limit = {
    fileSize: 1024 * 1024 * 3
}

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Only Image File Accepted"));
    }
}

const upload = multer({
    storage: storage,
    limits: limit,
    fileFilter: fileFilter
});

router.post("/register", upload.single("photo"), async (req, res) => {
    try {

        let img = await cloudinary.uploader.upload(req.file.path);
        let { name } = req.body;

        let date = moment().format("YYYY-MM-DD");

        let user = new userModel({
            name, imagePath: img.secure_url, date
        })

        user = await user.save();

        res.status(201).send({ message: "user-registered succesfully", user });

    } catch (error) {
        console.log(error);
    }
});

router.get('/', async (req, res) => {
    try {
        let user = await userModel.find();
        console.log("user", user);
        res.send({ user })
    } catch (error) {
        console.log(error)
    }
})


export default router;