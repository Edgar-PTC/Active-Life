import CarModel from '../models/shoppingCartModel.js';
import productsModel from "../models/productsModel.js";

const carShopController = {};

// Convierte un documento de carrito (schema: clientId, products[].amount/unitPrice) al shape
// que espera el frontend (customerId-less, products[].quantity)
const formatearCarrito = (cart) => ({
    _id: cart._id,
    clientId: cart.clientId,
    status: cart.status,
    total: cart.total,
    products: cart.products.map(p => ({
        productId: p.productId,
        quantity: p.amount,
        subtotal: p.subtotal
    }))
});

carShopController.getAllCarts = async (req, res) => {
    try {
        const get = await CarModel.find().populate("products.productId", "name price").populate("clientId", "name email");
        res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

carShopController.getById = async (req, res) => {
    try {
        const cart = await CarModel.findById(req.params.id).populate("products.productId", "name price").populate("clientId", "name email");
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
        const { clientId } = req.body;

        const cart = await CarModel.findOne({
            clientId: clientId, status: "active"
        }).populate("products.productId", "name price image");

        if(!cart){
            return res.status(404).json({message: "Client without cart active"});
        }

        res.status(200).json(formatearCarrito(cart));
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

        const {clientId, products} = req.body;

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
                amount: products[s].quantity,
                unitPrice: product.price,
                subtotal
            });


        }
        const newCart = new CarModel({
            clientId,
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

carShopController.calculateCart = async (req, res) => {
    try {
        const { products } = req.body;

        let total = 0;
        let newProducts = [];

        for (let i = 0; i < products.length; i++) {
            const productFound = await productsModel.findById(products[i].productId);

            if (!productFound) {
                return res.status(404).json({ message: `Product ${products[i].productId} not found` });
            }

            const subtotal = productFound.price * products[i].quantity;
            total += subtotal;

            newProducts.push({
                productId: products[i].productId,
                name: productFound.name,
                image: productFound.image,
                price: productFound.price,
                quantity: products[i].quantity,
                subtotal
            });
        }

        return res.status(200).json({ products: newProducts, total });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

carShopController.syncCart = async (req, res) => {
    try {
        const { clientId, products } = req.body;

        if (!clientId) {
            return res.status(400).json({ message: "clientId is required" });
        }

        let total = 0;
        let newProducts = [];

        for (let s = 0; s < products.length; s++) {
            const product = await productsModel.findById(products[s].productId);

            if (!product) {
                continue;
            }

            const subtotal = product.price * products[s].quantity;
            total += subtotal;

            newProducts.push({
                productId: products[s].productId,
                amount: products[s].quantity,
                unitPrice: product.price,
                subtotal
            });
        }

        const cart = await CarModel.findOneAndUpdate(
            { clientId, status: "active" },
            { clientId, products: newProducts, total, status: "active" },
            { new: true, upsert: true }
        );

        return res.status(200).json(formatearCarrito(cart));
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

carShopController.updateCart = async (req, res) => {
    try {
        const {clientId, products, status} = req.body;

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
                amount: products[s].quantity,
                unitPrice: product.price,
                subtotal
            });
        }

        const updateCart = await CarModel.findByIdAndUpdate(req.params.id, {
            clientId,
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
