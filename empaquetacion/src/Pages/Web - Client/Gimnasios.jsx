import { useState, useEffect, useMemo } from "react";
import BarraBusqueda from "../../Components/BarraBusqueda.jsx";
import CardGimnasio from "../../Components/CardGimnasio.jsx";
import useGyms from "../../hooks/useGyms";

const PER_PAGE = 6;

const Gimnasios = () => {
  const { todosLosGyms, getAllGyms } = useGyms();
  const [busqueda, setBusqueda] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllGyms();
  }, []);

  const gimnasiosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    if (!termino) return todosLosGyms;
    return todosLosGyms.filter((gym) =>
      `${gym.name} ${gym.city} ${gym.municipio}`.toLowerCase().includes(termino)
    );
  }, [todosLosGyms, busqueda]);

  const totalPages = Math.max(1, Math.ceil(gimnasiosFiltrados.length / PER_PAGE));
  const visibles = gimnasiosFiltrados.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const manejarBusqueda = (valor) => {
    setBusqueda(valor);
    setPage(1);
  }

  return (
    <div className="min-h-screen px-8 py-8" style={{background: 'var(--green_CFD9C7)'}}>

      {/* Barra de búsqueda */}
      <BarraBusqueda onChange={manejarBusqueda} />

      {/* Grid de cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibles.length === 0 && (
          <p className="col-span-full text-center" style={{color: 'var(--brown)'}}>No se encontraron gimnasios.</p>
        )}
        {visibles.map((gym) => (
          <CardGimnasio
            key={gym._id}
            gym={{
              id: gym._id,
              nombre: gym.name,
              ciudad: gym.city,
              zona: gym.municipio,
              imagen: gym.images?.[0]?.image,
            }}
          />
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
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
      )}

    </div>
  );
}

export default Gimnasios;
