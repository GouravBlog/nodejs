import orderModel from "../models/order.models.js";

export const createOrder = async (req, res) => {
    try {
        let { user, description, quantity, products } = req.body;
        if (!user || !description || !quantity || !products) {
            res.status(401).send({ status: false, messgae: 'all fileds are required' });
        }

        let order = new orderModel({ user, description, quantity, products });

        order = await order.save();

        res.status(201).send({ status: true, messgae: 'order create succesfully', order });

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ status: false, messgae: 'create product errpr', error: error.messgae });

    }
}


export const findOrders = async (req, res) => {
    try {
        let orders = await orderModel.find({}).populate('products').populate("user");

        res.status(200).send({ status: true, total: orders.length, orders });
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ status: false, messgae: 'find orders', error: error.messgae });
    }
}