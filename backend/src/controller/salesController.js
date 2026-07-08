import salesModel from "../models/salesModel.js";
import CarModel from "../models/carShopModel.js";

const salesController = {};

salesController.getAllSales = async (req, res) => {
    try {
        const sales = await salesModel.find().populate("shoppingCartId");
        return res.status(200).json(sales);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

salesController.createSale = async (req, res) => {
    try {
        const newSale = new salesModel({
            ...req.body,
            status: "Pendiente"
        });

        await newSale.save();

        if (req.body.shoppingCartId) {
            await CarModel.findByIdAndUpdate(req.body.shoppingCartId, { status: "completed" });
        }

        return res.status(201).json({ message: "Sale created successfully" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default salesController;
