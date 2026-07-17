import membershipModel from "../models/membershipModel.js";

const membershipController = {};

membershipController.getAll = async ( req, res) => {
    try {
        const memberships = await membershipModel.find()

        if(!memberships){
            return res.status(404).json({message: "No hay membresias disponibles"})
        }

        return res.status(200).json(memberships)
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

membershipController.getById = async (req, res) => {
    try {
        const membership = await membershipModel.findById(req.params.id)
        if (!membership) {
            return res.status(404).json({message: `no se encontro membresia con id: ${id}`})
        }
        return res.status(200).json(membership)
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

membershipController.insertgym = async (req, res) => {
    try {
        let {name, price, gymId, description, paymentPeriod} = req.body

        if (!name || !price || !paymentPeriod) {
            return res.status(400).json({message: "Campos Incompletos"})
        }

        if(price <= 0){
            return res.status(400).json({message: "Precio no debe de ser menor a cero"});
        }

        const newMembership = new membershipModel({
            name, 
            price, 
            gymId,
            description,
            paymentPeriod
        })

        await newMembership.save()

        return res.status(200).json({message: "Membresia Guardada"})

    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

membershipController.updateMembership = async (req, res) => {
    try {
        let {name, price, gymId, description, paymentPeriod} = req.body

        const membershipFound = await membershipModel.findById(req.params.id).populate("gymId", "name address" )

        if (!membershipFound) {
            return res.status(404).json({message: "Membresia no encontrada"})
        }

        if (!name || !price || !paymentPeriod) {
            return res.status(400).json({message: "Campos Incompletos"})
        }

        if(price <= 0){
            return res.status(400).json({message: "Precio no debe de ser menor a cero"});
        }

        const updateMembership = await membershipModel.findByIdAndUpdate(req.params.id, {
            name, 
            price, 
            gymId,
            description,
            paymentPeriod
        }, {new: true})

        await updateMembership.save()

        return res.status(200).json({message: "Membresia Actualizada"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

membershipController.deleteMembership = async (req, res) => {
    try {
        const deleteMembership = await membershipModel.findById(req.params.id);

        if (!deleteMembership) {
            return res.status(404).json({message: "Membresia no encontrada"})
        }

        await membershipModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Membresia Eliminada"})

    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default membershipController;