import { Link } from "react-router-dom";

function PrimerUso() {
  return (
    <div className="p-6">
      {/* Título principal */}
      <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>

      {/* Tarjetas resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Membresías */}
        <div className="bg-white shadow-md rounded p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Membresías</h3>
          <p className="text-3xl font-bold">3</p>
          <p className="text-gray-500 mb-3">Total registradas</p>

          <Link
            to="/admin/membresias"
            className="bg-blue-500 text-white px-3 py-1 rounded transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          >
            Ver Membresías
          </Link>
        </div>

        {/* Pedidos */}
        <div className="bg-white shadow-md rounded p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Pedidos</h3>
          <p className="text-3xl font-bold">12</p>
          <p className="text-gray-500 mb-3">Pedidos recientes</p>

          <Link
            to="/admin/pedidos"
            className="bg-blue-500 text-white px-3 py-1 rounded transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          >
            Ver Pedidos
          </Link>
        </div>

        {/* Ingresos */}
        <div className="bg-white shadow-md rounded p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
          <h3 className="text-lg font-semibold mb-2">Ingresos</h3>
          <p className="text-3xl font-bold">$350</p>
          <p className="text-gray-500 mb-3">Este mes</p>

          <Link
            to="/admin/membresias"
            className="bg-blue-500 text-white px-3 py-1 rounded transition-all duration-300 hover:bg-blue-600 hover:scale-105 active:scale-95"
          >
            Gestionar
          </Link>
        </div>

      </div>

      {/* Sección de bienvenida */}
      <div className="bg-white shadow-md rounded p-6 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Bienvenido al sistema</h3>
        <p className="text-gray-600 mb-4">
          Este es tu panel de administración. Desde aquí podrás gestionar las
          membresías, revisar pedidos y controlar la información del sistema.
        </p>

        {/* Botones rápidos */}
        <div className="flex gap-4">
          <Link
            to="/admin/membresias"
            className="bg-green-600 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-green-700 hover:scale-105 active:scale-95"
          >
            Ir a Membresías
          </Link>

          <Link
            to="/admin/pedidos"
            className="bg-purple-600 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-purple-700 hover:scale-105 active:scale-95"
          >
            Ir a Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PrimerUso;