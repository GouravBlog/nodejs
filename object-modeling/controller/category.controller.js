import categoryModel from "../models/category.models.js";

export const createCategory = async (req, res) => {
    try {
        let { name, description } = req.body;

        if (!name || !description) {
            res.status(401).send({ status: false, messgae: 'all fileds are required' });
        };

        let exist_category = await categoryModel.findOne({ name: name });

        if (exist_category) {
            res.status(403).send({ status: false, messgae: 'Category already exist' });
        }

        let category = new categoryModel({ name, description });

        category = await category.save();

        res.status(201).send({ status: true, messgae: 'category create succesfully', category });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ status: false, messgae: 'create category error', error: error.messgae });
    }
}