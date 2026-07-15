import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Phone,
  Lock,
  HelpCircle,
  FileText,
  ShieldCheck,
  Pencil,
  ChevronRight,
  LogOut,
  Leaf,
  ShoppingCart,
  CircleDot,
  Home,
  ShoppingBag,
  LayoutGrid,
} from "lucide-react";
import { useAuth } from "../../Context/clientContext";
import usePerfil from "../../hooks/usePerfil";

const SETTINGS_ITEMS = [
  { icon: Phone, label: "Soporte técnico" },
  { icon: Lock, label: "Cambiar contraseña" },
  { icon: HelpCircle, label: "Centro de ayuda / FAQ" },
  { icon: FileText, label: "Términos y condiciones" },
  { icon: ShieldCheck, label: "Políticas de privacidad" },
];

function EditProfileModal({ open, onClose, name, email, birthDate, onSave }) {
  const [form, setForm] = useState({ name, email, birthDate });
 
  useEffect(() => {
    if (open) setForm({ name, email, birthDate });
  }, [open, name, email, birthDate]);
 
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);
 
  if (!open) return null;
 
  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form)
  };
 
  return(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
    >
      {/* Fondo oscurecido */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-[#263821]/50 backdrop-blur-[2px] cursor-default"
      />
 
      {/* Tarjeta del modal */}
      <div className="relative bg-[#F7F8F2] w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-start justify-between mb-1">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#7F9E7A]">
              ActiveLife
            </span>
            <h2
              id="edit-profile-title"
              className="font-display font-semibold text-2xl text-[#455942] mt-1"
            >
              Editar perfil
            </h2>
          </div>
          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5A6E56] hover:bg-[#E7EDDF] transition-colors shrink-0"
          >
          </button>
        </div>
 
        <div className="mb-6">
          <svg width="90" height="10" viewBox="0 0 90 10" fill="none" className="text-[#7F9E7A]" aria-hidden="true">
            <path
              d="M1 5C15 1 30 9 45 5C60 1 75 9 89 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
 
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#455942]">Nombre</span>
            <input
              type="text"
              value={form.name || ""}
              onChange={handleChange("name")}
              placeholder="Nombre completo"
              required
              className="w-full rounded-xl border border-[#D6E0CC] bg-white px-4 py-3 text-[#263821] placeholder-[#9DAE95] outline-none focus:border-[#7F9E7A] focus:ring-2 focus:ring-[#7F9E7A]/30 transition"
            />
          </label>
 
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#455942]">Correo</span>
            <input
              type="email"
              value={form.email || ""}
              onChange={handleChange("email")}
              placeholder="correo@ejemplo.com"
              required
              className="w-full rounded-xl border border-[#D6E0CC] bg-white px-4 py-3 text-[#263821] placeholder-[#9DAE95] outline-none focus:border-[#7F9E7A] focus:ring-2 focus:ring-[#7F9E7A]/30 transition"
            />
          </label>
 
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-[#455942]">Fecha de nacimiento</span>
            <input
              type="date"
              value={form.birthDate || ""}
              onChange={handleChange("birthDate")}
              required
              className="w-full rounded-xl border border-[#D6E0CC] bg-white px-4 py-3 text-[#263821] outline-none focus:border-[#7F9E7A] focus:ring-2 focus:ring-[#7F9E7A]/30 transition"
            />
          </label>
 
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl py-3 font-semibold text-[#455942] border border-[#D6E0CC] hover:bg-[#E7EDDF] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-2xl py-3 font-semibold text-white bg-[#7F9E7A] hover:bg-[#729070] transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ActiveLifeSettings() {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const { logOut } = useAuth();
    const { id } = useParams();
    const { nombre, email, birthdate, me, update } = usePerfil();

    const handleSaveProfile = (updated) => {
      update(updated);
      setIsEditOpen(false);
    };

    useEffect(() => {
      me(id);
    }, []);

  return (
    <div className="min-h-screen w-full bg-[#CFD9C7] flex font-[Inter]">

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-8 md:px-12 md:py-10 max-w-5xl mx-auto w-full">

        {/* Tarjeta de perfil (héroe horizontal) */}
        <section className="bg-[#7F9E7A] rounded-3xl p-6 md:p-8 flex items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-[#96B092] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#DDE6D6]" fill="currentColor">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
            </div>
            <div>
              <p className="font-display font-semibold text-xl text-white leading-tight">
                {nombre || "Sin datos"}
              </p>
              <p className="text-[#EAF0E4] text-sm mt-0.5">
                {email || "Sin datos"}
              </p>
              <p className="text-[#EAF0E4] font-bold text-lg mt-0.5">
                {birthdate || "Sin datos"}
              </p>
            </div>
          </div>
          <button
            aria-label="Editar perfil"
            onClick={() => setIsEditOpen(true)}
            className="w-11 h-11 rounded-full bg-[#729070] hover:bg-[#658163] flex items-center justify-center transition-colors shrink-0"
          >
            <Pencil className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </section>

        {/* Cuerpo en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de ajustes: conserva el verde sólido + texto blanco original */}
          <section className="lg:col-span-2">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-[#5A6E56] mb-3">
              Preferencias
            </h2>
            <div className="flex flex-col gap-3">
              {SETTINGS_ITEMS.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#7F9E7A] hover:bg-[#729070] transition-colors text-left"
                >
                  <Icon className="w-5 h-5 text-white shrink-0" strokeWidth={2} />
                  <span className="flex-1 font-semibold text-white">{label}</span>
                  <ChevronRight className="w-4 h-4 text-[#DDE6D6]" strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </section>

          {/* Panel lateral: estado + salir */}
          <aside className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold tracking-wider uppercase text-[#5A6E56] mb-[-0.5rem]">
              Estado
            </h2>
            <div className="bg-white/60 rounded-2xl border border-[#B8C9B0] p-5">
              <p className="text-sm text-[#5A6E56]">Versión de la app</p>
              <p className="font-display font-semibold text-lg text-[#455942] mt-1">
                v1.0.4
              </p>
            </div>

            <button onClick={() => logOut()} className="w-full flex items-center justify-center gap-2 bg-[#BF7E6F] hover:bg-[#AD6B5C] text-white font-semibold rounded-2xl py-4 transition-colors mt-2">
              <LogOut className="w-4.5 h-4.5" strokeWidth={2} />
              Cerrar sesión
            </button>
          </aside>
        </div>
      </main>

      <EditProfileModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveProfile}
        name={nombre}
        email={email}
        birthDate={birthdate}
      />
    </div>
  );
}