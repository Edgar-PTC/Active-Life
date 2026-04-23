import { useState } from "react";

function Membresias() {
  const [membresias, setMembresias] = useState([
    { id: 1, nombre: "Básica", precio: 10, duracion: "1 mes" },
    { id: 2, nombre: "Premium", precio: 25, duracion: "3 meses" },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregarMembresia = () => {
    if (!nombre || !precio || !duracion) return;

    const nueva = {
      id: Date.now(),
      nombre,
      precio: Number(precio),
      duracion,
    };

    setMembresias([...membresias, nueva]);

    setNombre("");
    setPrecio("");
    setDuracion("");
    setDescripcion("");
    setMostrarModal(false);
  };

  return (
    <div
      className="p-6 min-h-screen"
      style={{ background: "var(--green_CFD9C7)" }} // 👈 FONDO AÑADIDO
    >

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Membresías</h2>

        <button
          onClick={() => setMostrarModal(true)}
          className="bg-green-700 text-white px-4 py-2 rounded-xl transition hover:scale-105 hover:bg-green-800"
        >
          + Agregar
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white p-4 shadow rounded-xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nombre</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Duración</th>
            </tr>
          </thead>

          <tbody>
            {membresias.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="p-2">{m.nombre}</td>
                <td className="p-2">${m.precio}</td>
                <td className="p-2">{m.duracion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">

          <div className="bg-[#dfe7db] w-[500px] rounded-xl p-6 shadow-xl animate-fadeIn">

            {/* HEADER */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => setMostrarModal(false)}
                className="text-xl"
              >
                ←
              </button>

              <h3 className="text-xl font-bold text-[#5c4a3d]">
                Agregar nueva membresía
              </h3>
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-4">

              <div>
                <label className="text-sm text-[#5c4a3d]">
                  Nombre de la membresía
                </label>
                <input
                  type="text"
                  placeholder="Ej. Membresía Oro"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-100 outline-none"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm text-[#5c4a3d]">Precio</label>
                  <div className="flex items-center bg-gray-100 rounded-lg px-2">
                    <span className="text-gray-500">$</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      className="w-full p-3 bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <label className="text-sm text-[#5c4a3d]">
                    Periodo de pago
                  </label>
                  <select
                    value={duracion}
                    onChange={(e) => setDuracion(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-100 outline-none"
                  >
                    <option value="">Seleccionar periodo</option>
                    <option value="1 mes">1 mes</option>
                    <option value="3 meses">3 meses</option>
                    <option value="6 meses">6 meses</option>
                    <option value="1 año">1 año</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm text-[#5c4a3d]">Descripción</label>
                <textarea
                  placeholder="Ej: Acceso ilimitado a las pesas libres"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-100 outline-none h-24 resize-none"
                />
              </div>

              <button
                onClick={agregarMembresia}
                className="bg-[#3f5f45] text-white py-3 rounded-xl mt-2 flex justify-center items-center gap-2 transition hover:scale-105 hover:bg-[#2f4a35]"
              >
                ➕ Guardar membresía
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Membresias;