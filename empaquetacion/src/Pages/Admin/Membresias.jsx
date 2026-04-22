import { useState } from "react";

function Membresias() {
  const [membresias, setMembresias] = useState([
    { id: 1, nombre: "Básica", precio: 10, duracion: "1 mes" },
    { id: 2, nombre: "Premium", precio: 25, duracion: "3 meses" },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarEditar, setMostrarEditar] = useState(false);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [duracion, setDuracion] = useState("");

  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editPrecio, setEditPrecio] = useState("");
  const [editDuracion, setEditDuracion] = useState("");

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
    setMostrarModal(false);
  };

  const eliminarMembresia = (id) => {
    setMembresias(membresias.filter((m) => m.id !== id));
  };

  const abrirEditar = (m) => {
    setEditId(m.id);
    setEditNombre(m.nombre);
    setEditPrecio(m.precio);
    setEditDuracion(m.duracion);
    setMostrarEditar(true);
  };

  const guardarEdicion = () => {
    const actualizadas = membresias.map((m) =>
      m.id === editId
        ? {
            ...m,
            nombre: editNombre,
            precio: Number(editPrecio),
            duracion: editDuracion,
          }
        : m
    );

    setMembresias(actualizadas);
    setMostrarEditar(false);
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Membresías</h2>

        <button
          onClick={() => setMostrarModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-green-700 hover:scale-105 active:scale-95"
        >
          + Agregar
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white p-4 shadow rounded transition-all duration-300">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Nombre</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Duración</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {membresias.map((m) => (
              <tr key={m.id} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="p-2">{m.nombre}</td>
                <td className="p-2">${m.precio}</td>
                <td className="p-2">{m.duracion}</td>

                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => abrirEditar(m)}
                    className="bg-blue-500 text-white px-2 py-1 rounded transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => eliminarMembresia(m.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL AGREGAR */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg transform transition-all duration-300 scale-100 animate-[fadeIn_0.3s_ease]">

            <h3 className="text-xl font-bold mb-4">Agregar Membresía</h3>

            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex items-center border mb-3 rounded">
              <span className="px-2">$</span>
              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>

            <input
              type="text"
              placeholder="Duración"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-between">
              <button
                onClick={agregarMembresia}
                className="bg-green-600 text-white px-4 py-2 rounded transition hover:bg-green-700"
              >
                Guardar
              </button>

              <button
                onClick={() => setMostrarModal(false)}
                className="bg-gray-400 px-4 py-2 rounded transition hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITAR */}
      {mostrarEditar && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96 shadow-lg transform transition-all duration-300 scale-100 animate-[fadeIn_0.3s_ease]">

            <h3 className="text-xl font-bold mb-4">Editar Membresía</h3>

            <input
              type="text"
              value={editNombre}
              onChange={(e) => setEditNombre(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            <div className="flex items-center border mb-3 rounded">
              <span className="px-2">$</span>
              <input
                type="number"
                value={editPrecio}
                onChange={(e) => setEditPrecio(e.target.value)}
                className="w-full p-2 outline-none"
              />
            </div>

            <input
              type="text"
              value={editDuracion}
              onChange={(e) => setEditDuracion(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-between">
              <button
                onClick={guardarEdicion}
                className="bg-blue-600 text-white px-4 py-2 rounded transition hover:bg-blue-700"
              >
                Guardar cambios
              </button>

              <button
                onClick={() => setMostrarEditar(false)}
                className="bg-gray-400 px-4 py-2 rounded transition hover:bg-gray-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Membresias;