import { Link } from "react-router-dom";

function PrimerUso() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-10 w-[450px] text-center shadow-xl border border-white/30 animate-fadeIn">

        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-2xl">💪</span>
          <h1 className="text-xl font-bold text-white tracking-wide">
            ACTIVELIFE
          </h1>
        </div>

        {/* Mensaje */}
        <h2 className="text-2xl font-bold text-white mb-3">
          ¡No hay ningún administrador registrado!
        </h2>

        <p className="text-gray-200 mb-6">
          Empieza creando un usuario de administrador.
        </p>

        {/* Botón */}
        <Link
          to="/admin/register"
          className="inline-block bg-[#7F9E7A] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-[#6e8c69] hover:scale-105 active:scale-95"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default PrimerUso;