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
    const nueva = { id: Date.now(), nombre, precio: Number(precio), duracion };
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
    setMembresias(
      membresias.map((m) =>
        m.id === editId
          ? { ...m, nombre: editNombre, precio: Number(editPrecio), duracion: editDuracion }
          : m
      )
    );
    setMostrarEditar(false);
  };

  return (
    <div className="p-6 min-h-screen" style={{ background: "var(--green_CFD9C7)" }}>

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Membresías</h2>
        <button
          onClick={() => setMostrarModal(true)}
          className="text-white px-4 py-2 rounded transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ background: "var(--green_455942)" }}
        >
          + Agregar
        </button>
      </div>

      {/* TABLA */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ background: "var(--green_7F9E7A)" }}>
              <th className="p-3 text-left text-white">Nombre</th>
              <th className="p-3 text-left text-white">Precio</th>
              <th className="p-3 text-left text-white">Duración</th>
              <th className="p-3 text-left text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {membresias.map((m) => (
              <tr key={m.id} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="p-3">{m.nombre}</td>
                <td className="p-3">${m.precio}</td>
                <td className="p-3">{m.duracion}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => abrirEditar(m)}
                    className="text-white px-2 py-1 rounded transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ background: "var(--green_7F9E7A)" }}
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
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: "var(--green_455942)" }}
            >
              Agregar Membresía
            </h3>

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
              placeholder="Duración (Ej: 1 mes)"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-between">
              <button
                onClick={agregarMembresia}
                className="text-white px-4 py-2 rounded transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "var(--green_455942)" }}
              >
                Guardar
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded transition hover:bg-gray-500"
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
          <div className="bg-white p-6 rounded w-96 shadow-lg">
            <h3
              className="text-xl font-bold mb-4"
              style={{ color: "var(--green_455942)" }}
            >
              Editar Membresía
            </h3>

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
                className="text-white px-4 py-2 rounded transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: "var(--green_7F9E7A)" }}
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setMostrarEditar(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded transition hover:bg-gray-500"
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
