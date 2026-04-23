import { useParams } from "react-router";
import { Link } from "react-router";

import Reseñas from "./Reseñas";

// Datos de ejemplo — reemplazar con el fecth real para mas adelante
const GYM_DATA = {
  1: {
    nombre: "Fitness Fusion",
    descripcion: "Somos el gimnasio líder en San Salvador con más de 10 años de experiencia. Contamos con equipos de última generación, entrenadores certificados y un ambiente motivador para alcanzar tus metas.",
    direccion: "Calle La Mascota #425, Colonia San Benito, San Salvador.",
    cuota: "$8.99 mensuales",
    imagen: "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg",
  },
};

const GimnasioDetalle = () => {
    //useParams: manda a traer los parametros de un array para luego poder usarlos
  const { id } = useParams();
  const gym = GYM_DATA[id] ?? GYM_DATA[1];

  //Pagina que se renderiza en caso de que no encuentre el ID del gimnasio
    //   if (!gym) {
    //     return (
    //       <div className="min-h-screen bg-[#cfd9c7] flex items-center justify-center">
    //         <p className="text-[#3d5a30] font-semibold text-lg">Gimnasio no encontrado.</p>
    //       </div>
    //     );
    //   }

  return (
    <div className="min-h-screen bg-[#cfd9c7] px-8 py-10">

      {/* ── Card principal ── */}
        <div className="bg-[#8fb080] rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Columna izquierda — imagen + dirección */}
            <div className="flex flex-col gap-4">
                <img
                src={gym.imagen}
                alt={gym.nombre}
                className="w-full h-64 object-cover rounded-xl"
                />
                {/* Dirección */}
                <div className="rounded-xl bg-[#455942] px-4 py-3 flex items-start gap-3">
                <p className="text-white text-sm leading-snug">{gym.direccion}</p>
                </div>
            </div>

            {/* Columna derecha — nombre + descripción + cuota */}
            <div className="flex flex-col gap-4">
                {/* Nombre */}
                <h1 className="text-white font-Regular text-3xl text-center">
                {gym.nombre}
                </h1>

                {/* Descripción */}
                <div className="rounded-xl px-5 py-4 flex-1 bg-[#455942]">
                <p className="text-white leading-relaxed text-center">
                    {gym.descripcion}
                </p>
                </div>

                {/* Cuota */}
                <div className="rounded-xl px-5 py-3 flex items-center justify-between bg-[#455942]">
                    <span className="text-white font-regular text-sm">Tipo de cuota:</span>
                    <span className="text-white font-regular text-sm">{gym.cuota}</span>
                </div>
            </div>
            </div>


                {/* Botón inscribirse */}
                <Link to="/client/PagoMembresia">
                    <button className="bg-[#A3C087] mt-6 w-full md:w-1/2 mx-auto block hover:bg-[#9db87a] text-[#FFFFFF] font-regular text-lg py-3 rounded-xl transition-colors duration-200">
                        Inscribirse
                    </button>
                </Link>
        </div>

      {/* ── Sección reseñas ── */}
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#3d5a30]/40" />
          <h2 className="text-[#2c3e1f] font-bold text-2xl whitespace-nowrap">Reseñas</h2>
          <div className="flex-1 h-px bg-[#3d5a30]/40" />
        </div>

        {/* Aquí irán las reseñas — por ahora placeholder */}
        <div>
          <Reseñas />
        </div>
      </div>
    </div>
  );
}

export default GimnasioDetalle;