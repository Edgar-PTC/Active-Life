import { BrowserRouter as Router, Routes, Route, Outlet, Link, Navigate } from "react-router-dom";

// Navs
import Nav from "./Components/Nav1_Web";
import Nav2_Web from "./Components/Nav2_web";
import Nav_Admin from "./Components/Nav_Admin";

//Publicas(sin iniciar sesion)
import Home from "./Pages/Web - Client/Inicio";
import Us from "./Pages/Web - Client/Nosotros";
import Acceder from "./Pages/Web - Client/Acceder";

//Publicas(con iniciar sesion)
import DashboardClient from "./Pages/Web - Client/Dashboard";
import CarritoCliente from "./Pages/Web - Client/CarritoCliente";
import PagoCarritoCliente from "./Pages/Web - Client/PagoCarritoCliente";
import Gimnasios from "./pages/Web - Client/Gimnasios";

// Admin
import GimnasiosAdmin from "./Pages/Admin/Gimnasios";
import AgregarGimnasio from "./Pages/Admin/AgregarGimnasio";
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
    <Nav_Admin/>
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
          <Route path="/admin/primer-uso" element={<PrimerUso />} />
          <Route path="/admin/verificar-correo" element={<VerificarCorreo />} />
        </Route>

        {/* Cliente */}
        <Route element={<ClientLayout />}>
          <Route path="/client/dashboard" element={<DashboardClient />} />
          <Route path="/client/carritoCliente" element={<CarritoCliente />} />
          <Route path="/client/PagocarritoCliente" element={<PagoCarritoCliente />} />
          <Route path="/client/Gimnasios" element={<Gimnasios />} />
        </Route>

        {/* Admin */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>

            {/* Redirección */}
            <Route path="/admin/gimnasios/agregar" element={<AgregarGimnasio />} />
            <Route path="/admin/gimnasios" element={<GimnasiosAdmin />} />
            <Route path="/admin/gimnasios/agregar/membresias" element={<Membresias />} />
            <Route path="/admin/pedidos" element={<Pedidos />} />

          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;