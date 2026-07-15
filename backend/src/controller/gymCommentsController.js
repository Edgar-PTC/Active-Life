import gymCommentsModel from "../models/gymCommentsModel.js";

const gymCommentsController = {}

gymCommentsController.getPaginate = async (req, res) => {
    try{

        
        let {pagina, limite} = req.body;
        
        pagina = parseInt(pagina) || 1;
        limite = parseInt(limite) || 5; 
        
        const skip = (pagina -1) * limite;
        
        const comments = await gymCommentsModel.find().skip(skip).limit(limite); 
        
        const totalComments = await gymCommentsModel.countDocuments();
        
        return res.status(200).json({
            data: comments,
            pagina: pagina,
            totalPages: Math.ceil(totalComments / limite), 
            totalData: totalComments,
            limitPage: limite
        });

    }catch(error){
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymCommentsController.getAll = async (req, res) => {
    try {

        const gymComments = await gymCommentsModel.find().populate("clientId", "name email").populate("gymId", "name location");

        if (!gymComments) {
            return res.status(404).json({message: "No Hay comentarios disponibles"})
        }

        return res.status(200).json(gymComments)

    }catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymCommentsController.getById = async (req, res) => {
    try{
        const gymComment = await gymCommentsModel.findById(req.params.id).populate("clientId", "name email").populate("gymId", "name location");

        if (!gymComment) {
            return res.status(404).json({message: `No se encontro el comentario con id ${req.params.id}`})
        }

        return res.status(200).json(gymComment);
    }catch (error) {
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymCommentsController.insertComment = async (req, res) => {
    try {

        const { clientId, starRating, comments, gymId } = req.body;

        const newComment = new gymCommentsModel({ clientId, starRating, comments, gymId });
        
        await newComment.save();

        return res.status(201).json({message: "Comentario agregado exitosamente"});
    }catch (error){
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymCommentsController.updateComment = async (req, res) => {
    try {

        const { starRating, comments } = req.body;

        const updatedComment = await gymCommentsModel.findByIdAndUpdate(req.params.id, { starRating, comments }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({message: `No se encontro el comentario con id ${req.params.id}`})
        }

        return res.status(200).json({message: "Comentario actualizado exitosamente"});

    }catch (error){
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

gymCommentsController.deleteComment = async (req, res) => {
    try {

        const deletedComment = await gymCommentsModel.findByIdAndDelete(req.params.id);

        if (!deletedComment) {
            return res.status(404).json({message: `No se encontro el comentario con id ${req.params.id}`})
        }

        return res.status(200).json({message: "Comentario eliminado exitosamente"});

    }catch (error){
        console.log("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default gymCommentsController