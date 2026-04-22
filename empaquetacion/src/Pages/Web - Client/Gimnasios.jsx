import { useState } from "react";
import BarraBusqueda from "../../Components/BarraBusqueda.jsx";
import CardGimnasio from "../../Components/CardGimnasio.jsx";

// ── Datos de ejemplo ──
const GYMS = [
  { id: 1, nombre: "Fitness Fusion", ciudad: "San Salvador", zona: "Apopa", imagen: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80" },
  { id: 2, nombre: "Iron House Gym", ciudad: "San Salvador", zona: "Apopa", imagen: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80" },
  { id: 3, nombre: "Elite Fitness", ciudad: "San Salvador", zona: "Apopa", imagen: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80" },
  { id: 4, nombre: "PowerZone Gym", ciudad: "San Salvador", zona: "Apopa", imagen: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=80" },
  { id: 5, nombre: "Strong Body", ciudad: "San Salvador", zona: "Apopa", imagen: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&q=80" },
  { id: 6, nombre: "ActiveLife Center", ciudad: "San Salvador", zona: "Apopa", imagen: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80" },
];

const PER_PAGE = 6;

const Gimnasios = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(GYMS.length / PER_PAGE);
  const visible = GYMS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-[#a8c49a] px-8 py-8">

      {/* Barra de búsqueda */}
      <SearchBar />

      {/* Grid de cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((gym) => (
          <GymCard key={gym.id} gym={gym} />
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

