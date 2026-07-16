import salesModel from "../models/salesModel.js";
import CarModel from "../models/shoppingCartModel.js";
import mongoose from 'mongoose';

const salesController = {};

salesController.getAllSales = async (req, res) => {
    try {
        const sales = await salesModel.find().populate({
            path: "shoppingCartId",
            populate: [
                { path: "clientId", select: "name email" },
                { path: "products.productId", select: "name price image category" }
            ]
        });
        return res.status(200).json(sales);
    } catch (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

salesController.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const allowedStatuses = ["Pendiente", "Completado", "Cancelado"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Estado inv\u00e1lido" });
        }

        const sale = await salesModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!sale) return res.status(404).json({ message: "Pedido no encontrado" });
        return res.status(200).json(sale);
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

// controllers/salesController.js

salesController.buscarPorCliente = async (req, res) => {
    try {
        // ✅ CAMBIADO: Leer del body, no de params (porque es POST)
        const { clientId } = req.body;
        
        console.log("ClientId recibido:", clientId); // Para debug

        // Validar que el clientId exista
        if (!clientId) {
            return res.status(400).json({
                success: false,
                message: "El ID del cliente es requerido"
            });
        }

        // Validar formato de ObjectId
        if (!mongoose.Types.ObjectId.isValid(clientId)) {
            return res.status(400).json({
                success: false,
                message: "ID de cliente inválido"
            });
        }

        // Buscar todos los carritos del cliente
        const shoppingCarts = await CarModel.find({ 
            clientId: clientId 
        }).populate({
            path: 'products.productId',
            model: 'products'
        });

        console.log("Carritos encontrados:", shoppingCarts.length);

        // Si no tiene carritos, devolver array vacío
        if (!shoppingCarts || shoppingCarts.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "El cliente no tiene ventas registradas"
            });
        }

        // Obtener los IDs de los carritos
        const shoppingCartIds = shoppingCarts.map(cart => cart._id);

        // Buscar todas las ventas que correspondan a esos carritos
        const sales = await salesModel.find({
            shoppingCartId: { $in: shoppingCartIds }
        }).populate('shoppingCartId');

        console.log("Ventas encontradas:", sales.length);

        // Si no tiene ventas, devolver array vacío
        if (!sales || sales.length === 0) {
            return res.status(200).json({
                success: true,
                data: [],
                message: "El cliente no tiene ventas registradas"
            });
        }

        // Formatear la respuesta exactamente como el ejemplo
        const formattedSales = sales.map((sale, index) => {
            // Obtener el primer producto de la venta
            const mainProduct = sale.shoppingCartId?.products?.[0];
            const productName = mainProduct?.productId?.name || "Producto sin nombre";

            // Generar ID de orden con formato ORD-XXXX
            const orderNumber = String(index + 1).padStart(4, '0');
            const orderId = `ORD-${orderNumber}`;

            // Formatear la fecha
            const date = sale.createdAt ? 
                new Date(sale.createdAt).toISOString().split('T')[0] : 
                new Date().toISOString().split('T')[0];

            // Calcular el monto
            const amount = sale.shoppingCartId?.total || 
                sale.shoppingCartId?.products?.reduce((sum, p) => sum + (p.subtotal || 0), 0) || 
                0;

            // Mapear status
            const statusMap = {
                'pendiente': 'Pendiente',
                'en_camino': 'En camino', 
                'entregado': 'Entregado',
                'cancelado': 'Cancelado'
            };

            return {
                id: orderId,
                date: date,
                product: productName,
                amount: parseFloat(Number(amount).toFixed(2)),
                status: statusMap[sale.status?.toLowerCase()] || sale.status || "Pendiente"
            };
        });

        res.status(200).json({
            success: true,
            data: formattedSales,
            total: formattedSales.length
        });

    } catch (error) {
        console.log("Error en buscarPorCliente:", error);
        return res.status(500).json({ 
            success: false,
            message: "Internal server error",
            error: error.message 
        });
    }
}

export default salesController;
