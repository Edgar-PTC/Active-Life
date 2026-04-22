import { useState } from "react";

const VerificarCorreo = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", correo: "juan@gmail.com", estado: "pendiente" },
    { id: 2, nombre: "María López", correo: "maria@gmail.com", estado: "pendiente" },
    { id: 3, nombre: "Carlos Ruiz", correo: "carlos@gmail.com", estado: "pendiente" },
  ]);

  const aprobarUsuario = (id) => {
    const nuevosUsuarios = usuarios.map((user) =>
      user.id === id ? { ...user, estado: "aprobado" } : user
    );
    setUsuarios(nuevosUsuarios);
  };

  const rechazarUsuario = (id) => {
    const nuevosUsuarios = usuarios.map((user) =>
      user.id === id ? { ...user, estado: "rechazado" } : user
    );
    setUsuarios(nuevosUsuarios);
  };

  const getEstadoStyle = (estado) => {
    if (estado === "pendiente") return "text-yellow-600";
    if (estado === "aprobado") return "text-green-600";
    if (estado === "rechazado") return "text-red-600";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Verificación de Correos</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg transition-all duration-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Correo</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
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
                    className="bg-green-500 text-white px-3 py-1 rounded transition-all duration-300 hover:bg-green-600 hover:scale-105 active:scale-95"
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