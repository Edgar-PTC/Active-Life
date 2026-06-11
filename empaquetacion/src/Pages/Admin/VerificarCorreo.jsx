import { useState } from "react";

const VerificarCorreo = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@gmail.com", estado: "pendiente" },
    { id: 2, nombre: "María López", correo: "maria@gmail.com", estado: "pendiente" },
    { id: 3, nombre: "Carlos Ruiz", correo: "carlos@gmail.com", estado: "pendiente" },
  ]);

  const aprobarUsuario = (id) => {
    setUsuarios(
      usuarios.map((user) =>
        user.id === id ? { ...user, estado: "aprobado" } : user
      )
    );
  };

  const rechazarUsuario = (id) => {
    setUsuarios(
      usuarios.map((user) =>
        user.id === id ? { ...user, estado: "rechazado" } : user
      )
    );
  };

  const getEstadoStyle = (estado) => {
    if (estado === "pendiente") return "text-yellow-600";
    if (estado === "aprobado") return "text-green-600";
    if (estado === "rechazado") return "text-red-600";
  };

  return (
    <div className="p-6 min-h-screen" style={{ background: "var(--green_CFD9C7)" }}>
      <h1 className="text-2xl font-bold mb-4">Verificación de Correos</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr style={{ background: "var(--green_7F9E7A)" }}>
              <th className="p-3 text-left text-white">Nombre</th>
              <th className="p-3 text-left text-white">Correo</th>
              <th className="p-3 text-left text-white">Estado</th>
              <th className="p-3 text-left text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="p-3">{user.nombre}</td>
                <td className="p-3">{user.correo}</td>
                <td className={`p-3 font-semibold ${getEstadoStyle(user.estado)}`}>
                  {user.estado.charAt(0).toUpperCase() + user.estado.slice(1)}
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => aprobarUsuario(user.id)}
                    className="text-white px-3 py-1 rounded transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ background: "var(--green_455942)" }}
                  >
                    Aprobar
                  </button>
                  <button
                    onClick={() => rechazarUsuario(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
                  >
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerificarCorreo;
