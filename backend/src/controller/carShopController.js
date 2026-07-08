import CarModel from '../models/carShopModel.js';
import productsModel from "../models/productsModel.js";

const carShopController = {};

carShopController.getAllCarts = async (req, res) => {
    try {
        const get = await CarModel.find().populate("products.productId", "name price").populate("customerId", "name email");
        res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});       
    }
}

carShopController.getById = async (req, res) => {
    try {
        const cart = await CarModel.findById(req.params.id).populate("products.productId", "name price").populate("customerId", "name email");
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

carShopController.getByCliente = async (req, res) => {
    try {
        const { customerId } = req.body;

        const cart = await CarModel.findOne({
            customerId: customerId, status: "active"
        });

        if(!cart){
            return res.status(404).json({message: "Client without cart active"});
        }

        res.status(200).json(cart);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

carShopController.insertCart = async (req, res) => {
    try {

        const foundCart = await CarModel.findOne({status: "active"});
        if(foundCart){
            return res.status(400).json({message: "You already have an active cart"});
        }

        const {customerId, products} = req.body;

        ////////////////////////////// CALCULAR EL SUBTOTAL Y TOTAL //////////////////////////////
        let total = 0;
        let newProducts = [];


        for( let s = 0; s < products.length; s++ ) {
            //Buscamos el producto en la BD
            const product = await productsModel.findById(products[s].productId);

            if(!product){
                return res.status(400).json({message: `Product with not found`, id: products[s].productId});
            }

            let subtotal;

            if(products[s].gratis && products[s].gratis === true){
                subtotal = 0;
            }else{
                subtotal = product.price * products[s].quantity;
            }

            total += subtotal;

            newProducts.push({
                productId: products[s].productId,
                quantity: products[s].quantity,
                subtotal
            });

            
        }
        const newCart = new CarModel({
            customerId,
            products: newProducts,
            total,
            status: "active"
        });

        await newCart.save();

        return res.status(201).json({message: "Cart created"});
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

carShopController.updateCart = async (req, res) => {
    try {
        const {customerId, products, status} = req.body;

        let total = 0;
        let newProducts = [];

        for( let s = 0; s < products.length; s++ ) {
            //Buscamos el producto en la BD
            const product = await productsModel.findById(products[s].productId);

            if(!product){
                return res.status(400).json({message: `Product with not found`, id: products[s].productId});
            }

            let subtotal;

            if(products[s].gratis){
                subtotal = 0;
            }else{
                subtotal = product.price * products[s].quantity;
            }

            total += subtotal;

            newProducts.push({
                productId: products[s].productId,
                quantity: products[s].quantity,
                subtotal
            });
        }

        const updateCart = await CarModel.findByIdAndUpdate(req.params.id, {
            customerId,
            products: newProducts,
            total,
            status
        },
        {new: true});

        if(!updateCart){
            return res.status(404).json({message: "Cart not found"});
        }

        res.status(200).json({ message: "Cart updated successfully" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

carShopController.deleteCart = async (req, res) => {
    try {
        const deletedCart = await CarModel.findByIdAndDelete(req.params.id);

        if(!deletedCart){
            return res.status(404).json({message: "Cart not found"});
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default carShopController;