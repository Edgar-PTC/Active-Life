import { Link } from "react-router";

function CardGimnasio({ gym }) {
  const {
    nombre = "Fitness Fusion",
    ciudad = "San Salvador",
    zona = "Apopa",
    imagen = "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg",
  } = gym ?? {};
 
  return (
    <Link to={"/client/Gimnasios/${id}"}
      className="block rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] hover:shadow-lg transition-all duration-200 no-underline"
      >
          <div className="bg-[#7a9e6e] w-full">
          {/* Imagen */}
          <div className="w-full h-44 overflow-hidden">
            <img
              src={imagen}
              alt={nombre}
              className="w-full h-full object-cover"
            />
          </div>
    
          {/* Info */}
          <div className="px-4 py-3">
            <h3 className="text-white font-bold text-lg leading-tight truncate">
              {nombre}
            </h3>
            <p className="text-white/75 text-sm mt-0.5">
              {ciudad}, {zona}
            </p>
          </div>
        </div>
      </Link>
    
  );
}

export default CardGimnasio;