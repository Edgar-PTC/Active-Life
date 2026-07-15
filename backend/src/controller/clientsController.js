const clientController = {};

import clientsModel from "../models/clientsModel.js";

clientController.getClients = async (req, res) => {
    try {
        const clients = await clientsModel.find();
        return res.status(200).json(clients);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

clientController.getClientId = async (req, res) => {
    try {
        const get = await clientsModel.findById(req.params.id);
        if (!get) {
            return res.status(404).json({message: "Cliente no encontrado"})
        }
        return res.status(200).json(get);
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

clientController.deleteClients = async (req, res) => {
    try {
        const deleteClient = await clientsModel.findByIdAndDelete(req.params.id)

        if(!deleteClient){
            return res.status(400).json({message: "Client not found"})
        }
        
        return res.status(200).json({message: "Client deleted"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

clientController.updateClients = async (req, res) => {
    try {
        let {name, birthDate, email, status} = req.body;
        
        name = name?.trim();
        email = email?.trim();

        if(birthDate && birthDate >= Date.now()){
            return res.status(400).json({message: "la fecha no puede ser hoy o una en un futuro"})
        }

        if(name && name.lenght < 3){
            return res.status(400).json({message: "name too short"})
        }

        const clientFound = await clientsModel.findById(req.params.id);
        if(!clientFound){
            return res.status(400).json({message: "client not found"})
        }

        clientFound.name = name ?? clientFound.name;
        clientFound.birthDate = birthDate ?? clientFound.birthDate;
        clientFound.email = email ?? clientFound.email;
        clientFound.status = status ?? clientFound.status;

        await clientFound.save();

        return res.status(200).json({message: "Client modified"})
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default clientController;