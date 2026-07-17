import mongoose from "mongoose";
import gymModel from "../models/gymModel.js";
import membershipModel from "../models/membershipModel.js";

const gymController = {}

const conConteoMembresias = async (gyms) => {
    return Promise.all(gyms.map(async (gym) => {
        const membershipsCount = await membershipModel.countDocuments({ gymId: gym._id });
        return { ...gym.toObject(), membershipsCount };
    }));
}

gymController.getPaginate = async (req, res) => {
    try{

        let {pagina, limite} = req.body;

        pagina = parseInt(pagina) || 1;
        limite = parseInt(limite) || 6;

        const skip = (pagina -1) * limite;

        const gyms = await gymModel.find().skip(skip).limit(limite);

        const totalGyms = await gymModel.countDocuments();

        const gymsConMembresias = await conConteoMembresias(gyms);

        return res.status(200).json({
            data: gymsConMembresias,
            pagina: pagina,
            totalPages: Math.ceil(totalGyms / limite),
            totalData: totalGyms,
            limitPage: limite
        });
    }catch(error){
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymController.getAll = async (req, res) => {
    try {
        const gyms = await gymModel.find()

        if (!gyms) {
            return res.status(404).json({message: "No Hay gimnasios disponibles"})
        }

        const gymsConMembresias = await conConteoMembresias(gyms);

        return res.status(200).json(gymsConMembresias)
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymController.getByid = async (req, res) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message: "Id de gimnasio no valido"})
        }

        const gym = await gymModel.findById(req.params.id)

        if (!gym) {
            return res.status(404).json({message: `No se encontro el gimnasio con id ${req.params.id}`})
        }

        const membershipsCount = await membershipModel.countDocuments({ gymId: gym._id });

        return res.status(200).json({ ...gym.toObject(), membershipsCount })

    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymController.getByName = async (req, res) => {
    try {

        let {name} = req.body;

        const gyms = await gymModel.find({
            name: { $regex: name, $options: "i"}
        })

        return res.status(200).json(gyms)
        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymController.insertGym = async (req, res) => {
    try{

        let {name, description, address, city, municipio} = req.body

        if (!name) {
            return res.status(400).json({message: "El nombre del gimnasio es obligatorio"})
        }

        const imagesArray = (req.files || []).map((file) => ({
            image: file.path,
            public_id: file.filename
        }))

        const newGym = new gymModel({
            name,
            description,
            address,
            city,
            municipio,
            images: imagesArray //Array de imagenes con formato {image, public_id}
        })

        await newGym.save();

        return res.status(200).json({message: "Gimnasio Guardado correctamente"});

        
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymController.updateGym = async (req, res) => {
    try {
        const { name, description, address, city, municipio } = req.body;

        const gymFound = await gymModel.findById(req.params.id);

        if (!gymFound) {
            return res.status(404).json({ message: "Gimnasio no encontrado" });
        }

        const nuevasImagenes = (req.files || []).map((file) => ({
            image: file.path,
            public_id: file.filename
        }))

        const gymModified = {
            name: name || gymFound.name,
            description: description || gymFound.description,
            address: address || gymFound.address,
            city: city || gymFound.city,
            municipio: municipio || gymFound.municipio,
            images: [...gymFound.images, ...nuevasImagenes]
        }

        await gymModel.findByIdAndUpdate(req.params.id, gymModified, {new: true});

        return res.status(200).json({message: "Gimnasio Actualizado"})

    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymController.deleteGym = async (req, res) => {
    try {
        const deletedGym = await gymModel.findByIdAndDelete(req.params.id);

        if(!deletedGym){
            return res.status(404).json({message: "Gimnasio no encontrado"});
        }

        return res.status(200).json({message: "Gimnasio Eliminado"});
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default gymController;