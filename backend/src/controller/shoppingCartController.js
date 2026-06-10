import shoppingCartModel from "../models/shoppingCartModel.js";
import productsModel from "../models/productsModel.js";

const shoppingCartController = {};

shoppingCartController.getAllCarts = async (req, res) => {
    try {
        const carts = await shoppingCartModel.find()
            .populate("clientId", "name email")
            .populate("products.productId", "name price");

        return res.status(200).json(carts);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

shoppingCartController.getCartById = async (req, res) => {
    try {
        const cart = cartModel.findById(req.params.id)
            .populate("clientId", "name email")
            .populate("products.productId", "name price");

        return res.status(200).json(cart);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

shoppingCartController.insertCart = async (req, res) => {
    try {
        const { clientId, products } = req.body;

        let total = 0;

        //EN REVISION CON PROFE BRYAN INBTRODUCCIÓN CON DESCUENTO VOLÁTIL.
        let discount = 0;

        let newProducts = [];

        for (let i = 0; i < products.length; i++) {
            const productFound = await productsModel.findById(products[i].productId);

            const subtotal = productFound.price * products[i].amount;

            //EN REVISION CON PROFE BRYAN INTRODUCCIÓN CON DESCUENTO VOLÁTIL.
            total = total * 0.50
            
            total += subtotal;

            newProducts.push({
                productId: products[i].productId,
                amount: products[i].amount,
                subtotal: subtotal
            });
        }

        const newCart = new shoppingCartModel({
            clientId,
            products: newProducts,
            total,
            discount
        });

        await newCart.save();

        return res.status(201).json({ message: "Cart saved" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

shoppingCartController.updateCart = async (req, res) => {
    try {
        const { clientId, products} = req.body;

        let total = 0;

        //EN REVISION CON PROFE BRYAN INBTRODUCCIÓN CON DESCUENTO VOLÁTIL.
        let discount = 0;

        let newProducts = [];

        for (let i = 0; i < products.length; i++) {
            const productFound = await productsModel.findById(products[i].productId);
            
            const subtotal = productFound.price * products[i].amount;

            //EN REVISION CON PROFE BRYAN INTRODUCCIÓN CON DESCUENTO VOLÁTIL.
            total += subtotal;

            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].amount,
                subtotal: subtotal
            });
        }
        
        const updatedCart = await shoppingCartModel.findByIdAndUpdate(
            req.params.id,
            {
                clientId,
                products: newProducts,
                total,
                discount
            },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        return res.status(200).json({ message: "Cart updated" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

shoppingCartController.deleteCart = async (req, res) => {
    try {
        const deleteCart = await shoppingCartModel.findByIdAndDelete(req.params.id);

        if (!deleteCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ message: "Cart deleted" });
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default shoppingCartController;