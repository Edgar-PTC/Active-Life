import { Link } from "react-router";

const AVATAR_URL = null; // reemplaza con la URL real o pasa como prop
 
function Nav2_Web({ userName = "Edgar Ariel" }) {

    const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
 
  return (
    <nav className="flex items-center justify-between border-b border-green-700/30 px-6 py-3 bg-gradient-to-r from-[#7a9e6e] to-[#8fb080]">
 
      {/* ── Logo ── */}
      <div className="flex-shrink-0">
        <Link to="/">
          <img
            style={{ height: 40, width: "auto", objectFit: "contain" }}
            src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png"
            alt="ActiveLife logo"
          />
        </Link>
      </div>
 
      <div className="flex items-center gap-8 text-2xl font-bold text-[#2c3e1f]">
        <Link to="/" className="hover:underline underline-offset-4 decoration-2 transition-all">Inicio</Link>
        <Link to="/client/Gimnasios" className="hover:underline underline-offset-4 decoration-2 transition-all">Gimnasios</Link>
        <Link to="/client/tienda" className="hover:underline underline-offset-4 decoration-2 transition-all">Tienda</Link>
        <Link to="/client/carritoCliente" className="hover:underline underline-offset-4 decoration-2 transition-all">Carrito</Link>
      </div>
 
      {/* Perfil — píldora igual a la imagen de referencia */}
      <div className="flex items-center gap-3 bg-white/30 hover:bg-white/40 transition-colors cursor-pointer rounded-full pl-1 pr-4 py-1 select-none">
        {AVATAR_URL ? (
          <img
            src={AVATAR_URL}
            alt={userName}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#3d5a30] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {initials}
          </div>
        )}
        <span className="text-base font-semibold text-[#2c3e1f] whitespace-nowrap">
          {userName}
        </span>
      </div>
 
    </nav>
  );
}

export default Nav2_Web;
