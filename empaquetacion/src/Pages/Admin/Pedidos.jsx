import { useState } from "react";

function Pedidos() {
  const [pedidos, setPedidos] = useState([
    {
      id: "001",
      cliente: "Juan Pérez",
      producto: "Membresía Básica",
      total: "$10",
      estado: "Pendiente",
    },
    {
      id: "002",
      cliente: "María López",
      producto: "Membresía Premium",
      total: "$25",
      estado: "Completado",
    },
    {
      id: "003",
      cliente: "Carlos Ruiz",
      producto: "Membresía Básica",
      total: "$10",
      estado: "Cancelado",
    },
  ]);

  const cambiarEstado = (id, nuevoEstado) => {
    const nuevosPedidos = pedidos.map((pedido) =>
      pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
    );

    setPedidos(nuevosPedidos);
  };

  const getColorEstado = (estado) => {
    if (estado === "Pendiente") return "text-yellow-600";
    if (estado === "Completado") return "text-green-600";
    if (estado === "Cancelado") return "text-red-600";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Pedidos</h2>

      <div className="bg-white shadow-md rounded p-4 transition-all duration-300">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Producto</th>
              <th className="p-2">Total</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr
                key={pedido.id}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="p-2">{pedido.id}</td>
                <td className="p-2">{pedido.cliente}</td>
                <td className="p-2">{pedido.producto}</td>
                <td className="p-2">{pedido.total}</td>

                <td className={`p-2 font-semibold ${getColorEstado(pedido.estado)}`}>
                  {pedido.estado}
                </td>

                <td className="p-2">
                  {pedido.estado === "Pendiente" ? (
                    <>
                      <button
                        onClick={() => cambiarEstado(pedido.id, "Completado")}
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 transition-all duration-300 hover:bg-green-600 hover:scale-105 active:scale-95"
                      >
                        Aprobar
                      </button>

                      <button
                        onClick={() => cambiarEstado(pedido.id, "Cancelado")}
                        className="bg-red-500 text-white px-3 py-1 rounded transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
                      >
                        Rechazar
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">Sin acciones</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;