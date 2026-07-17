import { useEffect } from "react";
import { useParams, Link } from "react-router";
import useGyms from "../../hooks/useGyms";

import Reseñas from "./Reseñas";

const IMAGEN_POR_DEFECTO = "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg";

const GimnasioDetalle = () => {
    //useParams: manda a traer los parametros de un array para luego poder usarlos
  const { id } = useParams();
  const { gymSeleccionado, loadingGyms, getGymById } = useGyms();

  useEffect(() => {
    getGymById(id);
  }, [id])

  if (loadingGyms || !gymSeleccionado) {
    return (
      <div className="min-h-screen bg-[#cfd9c7] flex items-center justify-center">
        <p className="text-[#3d5a30] font-semibold text-lg">
          {loadingGyms ? "Cargando gimnasio..." : "Gimnasio no encontrado."}
        </p>
      </div>
    );
  }

  const gym = {
    nombre: gymSeleccionado.name,
    descripcion: gymSeleccionado.description,
    direccion: gymSeleccionado.address,
    imagen: gymSeleccionado.images?.[0]?.image ?? IMAGEN_POR_DEFECTO,
  };

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

            {/* Columna derecha — nombre + descripción */}
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
            </div>
            </div>

                {/* Botón inscribirse — pendiente de conectar con membresías reales */}
                <Link
                    to="/client/PagoMembresia"
                    state={{
                        membresia: {
                            name: "Membresía " + gym.nombre,
                            gimnasioNombre: gym.nombre,
                        }
                    }}
                >
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
