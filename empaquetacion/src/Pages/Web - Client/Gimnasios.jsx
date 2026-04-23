import { useState } from "react";
import BarraBusqueda from "../../Components/BarraBusqueda.jsx";
import CardGimnasio from "../../Components/CardGimnasio.jsx";

// ── Datos de ejemplo ──
const GYMS = [
  { id: 1, nombre: "Fitness Fusion", ciudad: "San Salvador", zona: "Apopa", imagen: "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg" },
  { id: 2, nombre: "Iron House Gym", ciudad: "San Salvador", zona: "Apopa", imagen: "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg" },
  { id: 3, nombre: "Elite Fitness", ciudad: "San Salvador", zona: "Apopa", imagen: "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg" },
  { id: 4, nombre: "PowerZone Gym", ciudad: "San Salvador", zona: "Apopa", imagen: "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg" },
  { id: 5, nombre: "Strong Body", ciudad: "San Salvador", zona: "Apopa", imagen: "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg" },
  { id: 6, nombre: "ActiveLife Center", ciudad: "San Salvador", zona: "Apopa", imagen: "https://res.cloudinary.com/dgv8dcd9n/image/upload/v1776738887/Gym_Free-weights_Area_crpg3c.jpg" },
];

const PER_PAGE = 6;

const Gimnasios = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(GYMS.length / PER_PAGE);
  const visible = GYMS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen px-8 py-8" style={{background: 'var(--green_CFD9C7)'}}>

      {/* Barra de búsqueda */}
      <BarraBusqueda />

      {/* Grid de cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((gym) => (
          <CardGimnasio key={gym.id} gym={gym} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex items-center justify-center gap-4 mt-10">
        {/* Flecha izquierda */}
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#2c3e1f] disabled:opacity-30 hover:bg-white/30 transition-colors"
        >
          ‹
        </button>

        {/* Dots */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-3 h-3 rounded-full transition-colors ${
              page === i + 1 ? "bg-[#3d5a30]" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}

        {/* Flecha derecha */}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#2c3e1f] disabled:opacity-30 hover:bg-white/30 transition-colors"
        >
          ›
        </button>
      </div>

    </div>
  );
}

export default Gimnasios;

