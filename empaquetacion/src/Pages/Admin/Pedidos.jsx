import { useState } from "react";

function Pedidos() {
  const [pedidos, setPedidos] = useState([
    {
      id: "#101",
      cliente: "Carlos Alfredo Montes",
      producto: "Membresía Básica",
      total: 10,
      estado: "Pendiente",
    },
    {
      id: "#102",
      cliente: "María López Cortez",
      producto: "Membresía Premium",
      total: 25,
      estado: "Pendiente",
    },
    {
      id: "#103",
      cliente: "Valeria Amatepec Montes",
      producto: "Membresía Básica",
      total: 10,
      estado: "Completado",
    },
    {
      id: "#104",
      cliente: "Edgar Ariel Pineda",
      producto: "Membresía Premium",
      total: 25,
      estado: "Pendiente",
    },
    {
      id: "#105",
      cliente: "Josue Guinea",
      producto: "Membresía Básica",
      total: 10,
      estado: "Completado",
    },
    {
      id: "#106",
      cliente: "Diego Alejandro Martínez",
      producto: "Membresía Premium",
      total: 25,
      estado: "Cancelado",
    },
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    const nuevosPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    );

    setPedidos(nuevosPedidos);
  };

  // 🎨 Estilos de estado
  const estadoStyle = (estado) => {
    if (estado === "Pendiente")
      return "bg-yellow-100 text-yellow-700";
    if (estado === "Completado")
      return "bg-green-100 text-green-700";
    if (estado === "Cancelado")
      return "bg-red-100 text-red-700";
  };

  return (
    <div
      className="p-6 min-h-screen"
      style={{ background: "var(--green_CFD9C7)" }} // ✅ CAMBIO AQUÍ
    >
      {/* Título */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📁 Gestión de pedidos
      </h2>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Nombre del cliente</th>
              <th className="p-4 text-left">Producto</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Estado</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr
                key={pedido.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-semibold">{pedido.id}</td>
                <td className="p-4">{pedido.cliente}</td>
                <td className="p-4">{pedido.producto}</td>

                {/* 💰 TOTAL */}
                <td className="p-4">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    ${pedido.total}
                  </span>
                </td>

                {/* 🎯 ESTADO */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${estadoStyle(
                      pedido.estado
                    )}`}
                  >
                    {pedido.estado}
                  </span>
                </td>

                {/* ⚙️ ACCIONES */}
                <td className="p-4 flex gap-2 items-center">
                  {pedido.estado === "Pendiente" ? (
                    <>
                      <button
                        onClick={() =>
                          cambiarEstado(pedido.id, "Completado")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-md flex items-center gap-1 transition hover:bg-green-600 hover:scale-105 active:scale-95"
                      >
                        ✔ Aprobar
                      </button>

                      <button
                        onClick={() =>
                          cambiarEstado(pedido.id, "Cancelado")
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded-md flex items-center gap-1 transition hover:bg-red-600 hover:scale-105 active:scale-95"
                      >
                        ✖ Rechazar
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Sin acciones
                    </span>
                  )}

                  {/* 👁 BOTÓN VER */}
                  <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                    👁
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="p-4 text-sm text-gray-500 flex justify-between items-center">
          <span>Mostrando 1-6 de {pedidos.length} pedidos</span>

          <div className="flex gap-2">
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              1
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              2
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pedidos;