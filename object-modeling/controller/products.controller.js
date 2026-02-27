import productModel from "../models/products.model.js";

export const createProduct = async (req, res) => {
    try {
        let { name, description, price, quantity, category } = req.body;
        if (!name || !description || !price || !quantity || !category) {
            res.status(401).send({ status: false, messgae: 'all fileds are required' });
        }

        let product = new productModel({ name, description, price, quantity, category });

        product = await product.save();

        res.status(201).send({ status: true, messgae: 'product create succesfully', product });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ status: false, messgae: 'create product errpr', error: error.messgae });

    }
}


export const findProducts = async (req, res) => {
    try {
        let products = await productModel.find({}).populate('category');

        res.status(200).send({ status: true, total: products.length, products });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ status: false, messgae: 'find products', error: error.messgae });
    }
}