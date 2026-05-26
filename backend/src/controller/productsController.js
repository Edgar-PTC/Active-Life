const productsController = {};

import productsModel from "../models/productsModel.js";

productsController.getAll = async (req, res) => {
    try {
        const products = await productsModel.find();
        return res.status(200).json(products);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.getById = async (req, res) => {
    try {
        const product = await productsModel.findById(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.insert = async (req, res) => {
    try {
        let { name, priceRequest, category, description } = req.body;

        name = name?.trim();
        category = category?.trim();
        description = description?.trim();

        if(!name || !category || !description){
            return res.status(400).json({message: "Todos los campos son requeridos"});
        }

        let price;
        if (typeof priceRequest === 'string') {
            price = parseFloat(priceRequest);
        }else{
            price = priceRequest;
        }

        if(price <= 0){
            return res.status(400).json({message: "price is 0 or less"});
        }

        const newProduct = new productsModel({
            name, price, stock: 0, category, image: req.file.path, image_id: req.file.filename, description
        });

        await newProduct.save();

        return res.status(200).json({ message: "product saved" })
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.delete = async (req, res) => {
    try {
        const deleteProduct = await productsModel.findByIdAndDelete(req.params.id);
        if(!deleteProduct){
            return res.status(400).json({message: "product not found"})
        }
        return res.status(200).json({message: "Product deleted"});
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

productsController.update = async (req, res) => {
    try {
        let { name, priceRequest, stockRequest, category, description } = req.body;

        name = name?.trim();
        category = category?.trim();
        description = description?.trim();
        priceRequest = priceRequest?.trim();
        stockRequest = stockRequest?.trim();

        let price;
        if (priceRequest && typeof priceRequest === 'string') {
            price = parseFloat(priceRequest);
        }else{
            price = priceRequest;
        }

        let stock;
        if (stockRequest && typeof stockRequest === 'string') {
            stock = parseFloat(stockRequest);
        }else{
            stock = stockRequest;
        }

        if(price != null && price <= 0){
            return res.status(400).json({message: "price is 0 or less"});
        }

        if(stock != null && stock < 0){
            return res.status(400).json({message: "stock less than 0"});
        }

        const productFound = await productsModel.findById(req.params.id);
        if(!productFound){
            return res.status(400).json({ message: "Product not found" });
        }

        productFound.name = name ?? productFound.name;
        productFound.price = price ?? productFound.price;
        productFound.stock = stock ?? productFound.stock;
        productFound.category = category ?? productFound.category;
        productFound.description = description ?? productFound.description;

        if(req.file){
            await cloudinary.uploader.destroy(productFound.image_id);
            productFound.image = req.file.path;
            productFound.image_id = req.file.filename;
        }

        await productFound.save();

        return res.status(200).json({ message: "Product modified" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default productsController;