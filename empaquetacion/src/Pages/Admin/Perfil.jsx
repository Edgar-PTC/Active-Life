import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BASE = "http://localhost:4000/apiActiveLife";

const errorToast = (title) => Swal.fire({ position: "top-end", title, icon: "error", timer: 2500, showConfirmButton: false });
const successToast = (title) => Swal.fire({ position: "top-end", title, icon: "success", timer: 2000, showConfirmButton: false });

const PerfilAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const load = async () => {
    try {
      const auth = await fetch(`${BASE}/auth/admin`, { method: "POST", credentials: "include" });
      if (!auth.ok) throw new Error();
      const { Id } = await auth.json();

      const response = await fetch(`${BASE}/admins/${Id}`, { credentials: "include" });
      if (!response.ok) throw new Error();

      const value = await response.json();
      setAdmin(value);
      setForm({ name: value.name || "", email: value.email || "", password: "", confirmPassword: "" });
    } catch {
      errorToast("No se pudo cargar el perfil");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      return Swal.fire("Datos inválidos", "Ingresa un nombre y correo válidos", "error");
    }
    if (form.password && (form.password.length < 5 || form.password !== form.confirmPassword)) {
      return Swal.fire("Contraseña inválida", "Debe tener al menos 5 caracteres y coincidir", "error");
    }

    try {
      const body = { name: form.name, email: form.email };
      if (form.password) body.password = form.password;

      const response = await fetch(`${BASE}/admins/${admin._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      await load();
      successToast("Perfil actualizado");
    } catch (error) {
      Swal.fire("Error", error.message || "No se pudo actualizar el perfil", "error");
    }
  };

  if (!admin) {
    return <main className="p-8 min-h-screen" style={{ background: "var(--green_CFD9C7)" }} />;
  }

  return (
    <main className="p-8 min-h-screen" style={{ background: "var(--green_CFD9C7)" }}>
      <div className="bg-white rounded-xl p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl"
            style={{ background: "var(--green_7F9E7A)" }}
          >
            {admin.photo ? (
              <img src={admin.photo} alt={admin.name} className="w-16 h-16 rounded-full object-cover" />
            ) : (
              admin.name?.charAt(0)
            )}
          </div>
          <div>
            <h2 className="text-2xl" style={{ color: "var(--green_455942)" }}>{admin.name}</h2>
            <p>{admin.role || "admin"} · {admin.status ? "Activo" : "Inactivo"}</p>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={save}>
          <label>
            Nombre
            <input
              className="w-full bg-gray-100 p-2 rounded-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label>
            Correo
            <input
              type="email"
              className="w-full bg-gray-100 p-2 rounded-lg"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>

          <label>
            Nueva contraseña
            <input
              type="password"
              className="w-full bg-gray-100 p-2 rounded-lg"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </label>

          <label>
            Confirmar contraseña
            <input
              type="password"
              className="w-full bg-gray-100 p-2 rounded-lg"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />
          </label>

          <button className="text-white py-2 rounded-xl" style={{ background: "var(--green_7F9E7A)" }}>
            Guardar cambios
          </button>
        </form>
      </div>
    </main>
  );
};

export default PerfilAdmin;
