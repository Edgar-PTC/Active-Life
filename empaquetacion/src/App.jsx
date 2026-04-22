import { BrowserRouter as Router, Routes, Route, Outlet, Link, Navigate } from "react-router-dom";

// Navs y páginas públicas
import Nav from "./Components/Nav1_Web";
import Home from "./Pages/Web - Client/Inicio";
import Us from "./Pages/Web - Client/Nosotros";
import Acceder from "./Pages/Web - Client/Acceder";
import DashboardClient from "./Pages/Web - Client/Dashboard";
import CarritoCliente from "./Pages/Web - Client/CarritoCliente";
import PagoCarritoCliente from "./Pages/Web - Client/PagoCarritoCliente";
import Nav2_Web from "./Components/Nav2_web";

// Admin
import Register from "./Pages/Admin/Registro";
import Membresias from "./Pages/Admin/Membresias";
import Pedidos from "./Pages/Admin/Pedidos";
import PrimerUso from "./Pages/Admin/PrimerUso";
import VerificarCorreo from "./Pages/Admin/VerificarCorreo";

// Layout público
const WebLayout = () => (
  <>
    <Nav />
    <Outlet />
  </>
);

// Sin layout
const NoLayout = () => <Outlet />;

// Cliente
const ClientLayout = () => (
  <>
    <Nav2_Web />
    <Outlet />
  </>
);

// Simulación admin (temporal)
const isAdmin = true;

const AdminRoute = () => {
  return isAdmin ? <Outlet /> : <Navigate to="/inicioSesion" />;
};

// Layout admin
const AdminLayout = () => (
  <>
    <div className="bg-[#455942] text-white p-4 flex justify-between">
      <h1 className="font-bold">Admin Panel</h1>

      <div className="flex gap-4">
        <Link to="/admin/membresias">Membresías</Link>
        <Link to="/admin/pedidos">Pedidos</Link>
        <Link to="/admin/primer-uso">Inicio</Link>
        <Link to="/admin/verificar-correo">Verificar Correo</Link>
      </div>
    </div>

    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <Routes>

        {/* Público */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/us" element={<Us />} />
        </Route>

        {/* Sin layout */}
        <Route element={<NoLayout />}>
          <Route path="/inicioSesion" element={<Acceder />} />
          <Route path="/admin/register" element={<Register />} />
        </Route>

        {/* Cliente */}
        <Route element={<ClientLayout />}>
          <Route path="/client/dashboard" element={<DashboardClient />} />
          <Route path="/client/carritoCliente" element={<CarritoCliente />} />
          <Route path="/client/PagocarritoCliente" element={<PagoCarritoCliente />} />
        </Route>

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>

            {/* Redirección */}
            <Route path="/admin" element={<Navigate to="/admin/membresias" />} />

            <Route path="/admin/membresias" element={<Membresias />} />
            <Route path="/admin/pedidos" element={<Pedidos />} />
            <Route path="/admin/primer-uso" element={<PrimerUso />} />
            <Route path="/admin/verificar-correo" element={<VerificarCorreo />} />

          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;