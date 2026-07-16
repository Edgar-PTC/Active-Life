import gymModel from "../models/gymModel.js";

const gymController = {}

gymController.getPaginate = async (req, res) => {
    try{
    
        let {pagina, limite} = req.body;

        pagina = parseInt(pagina) || 1;
        limite = parseInt(limite) || 6; 

        const skip = (pagina -1) * limite;

        const gyms = await gymModel.find().skip(skip).limit(limite); 

        const totalGyms = await gymModel.countDocuments();

        return res.status(200).json({
            data: gyms,
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

        return res.status(200).json(gyms)
    } catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymController.getByid = async (req, res) => {
    try {

        const gym = await gymModel.findById(req.params.id)

        if (!gym) {
            return res.status(404).json({message: `No se encontro el gimnasio con id ${id}`})
        }

        return res.status(200).json(gym)
        
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

        let {name, description, address, city, images} = req.body
        
        let imagesArray = [];

        

        //Parsear imagenes si vienen como string
        if (typeof images === 'string'){
            try{
                imagesArray = JSON.parse(images);
            }catch{
                return res.status(400).json({message: "Formato de imagenes no valido"})
            }
        } else if(Array.isArray(images)){
            //Si las imagenes vienen como array, asignarlas directamente
            imagesArray = images;
        }

        imagesArray.push({
            image: req.file.path,
            public_id: req.file.filename
        })
        //Validar que todas las imagenes tengan el formato correcto
        if (!Array.isArray(imagesArray)) {
            return res.status(400).json({message: "Formato de imagenes no valido"})
        }

        const newGym = new gymModel({
            name,
            description,
            address,
            city,
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
        const { name, description, address, city, images } = req.body;

        const gymFound = await gymModel.findById(req.params.id).populate;

        if (!gymFound) {
            return res.status(404).json({ message: "Gimnasio no encontrado" });
        }

        let imagesArray = []

        //Parsear imagenes si vienen como string
        if (typeof images === 'string'){
            try{
                imagesArray = JSON.parse(images);
            }catch{
                return res.status(400).json({message: "Formato de imagenes no valido"})
            }
        } else if(Array.isArray(images)){
            //Si las imagenes vienen como array, asignarlas directamente
            imagesArray = images;
        }

        imagesArray.push({
            image: req.file.path,
            public_id: req.file.filename
        })

        //Validar que todas las imagenes tengan el formato correcto
        if (!Array.isArray(imagesArray)) {
            return res.status(400).json({message: "Formato de imagenes no valido"})
        }

        const gymModified = {
            name: name || gymFound.name,
            description: description || gymFound.description,
            address: address || gymFound.address,
            city: city || gymFound.city,
        }

        if (req.file) {
            await cloudinary.uploader.destroy(gymFound.public_id)
            gymModified.image = req.file.path
            gymModified.public_id = req.file.filename;
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