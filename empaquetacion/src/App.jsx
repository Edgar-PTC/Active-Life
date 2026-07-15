import { BrowserRouter, Routes, Route, Outlet, Link, Navigate } from "react-router-dom";

// Navs
import Nav from "./Components/Nav1_Web";
import Nav2_Web from "./Components/Nav2_web";
import Nav_Admin from "./Components/Nav_Admin";

//Publicas(sin iniciar sesion)
import Home from "./Pages/Web - Client/Inicio";
import Us from "./Pages/Web - Client/Nosotros";
import AccederClient from "./Pages/Web - Client/Acceder";
import RegisterClient from "./Pages/Web - Client/RegistroClient.jsx";
import VerificarCorreoClient from "./Pages/Web - Client/VerificarCorreoClient.jsx";

//Publicas(con iniciar sesion)
import DashboardClient from "./Pages/Web - Client/Dashboard";
import CarritoCliente from "./Pages/Web - Client/CarritoCliente";
import PagoCarritoCliente from "./Pages/Web - Client/PagoCarritoCliente";
import Gimnasios from "./pages/Web - Client/Gimnasios.jsx";
import GimnasioDetalle from "./Pages/Web - Client/GimnasioDetalle.jsx";
import PagoMembresia from "./Pages/Web - Client/PagoMembresia.jsx";
import Tienda from "./Pages/Web - Client/Tienda.jsx";
import ProductoDetalle from "./Pages/Web - Client/ProductoDetalle.jsx";
import Perfil from "./Pages/Web - Client/Perfil.jsx";

// Admin
import AccederAdmin from "./Pages/Admin/Acceder.jsx";
import GimnasiosAdmin from "./Pages/Admin/Gimnasios";
import ProductosAdmin from "./Pages/Admin/Productos.jsx";
import AgregarGimnasio from "./Pages/Admin/AgregarGimnasio";
import RegisterAdmin from "./Pages/Admin/Registro";
import Membresias from "./Pages/Admin/Membresias";
import Pedidos from "./Pages/Admin/Pedidos";
import PrimerUso from "./Pages/Admin/PrimerUso";
import VerificarCorreoAdmin from "./Pages/Admin/VerificarCorreo";
import DashboardAdmin from "./Pages/Admin/Dashboard";
import PerfilAdmin from "./Pages/Admin/Perfil";

//Rutas protegidas
import { AuthProvider } from "./Context/clientContext.jsx";
import PrivateRoute from "./Components/privateRoute.jsx";

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
    <BrowserRouter>
      <AuthProvider>
      <Routes>

        {/* Público */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/us" element={<Us />} />
        </Route>

        {/* Sin layout */}
        <Route element={<NoLayout />}>
          <Route path="/inicioSesion" element={<AccederClient />} />
          <Route path="/register" element={<RegisterClient />} />
          <Route path="/verificarCorreo" element={<VerificarCorreoClient />} />
          <Route path="/admin/inicioSesion" element={<AccederAdmin />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
          <Route path="/admin/primerUso" element={<PrimerUso />} />
        </Route>

        <Route element={<PrivateRoute />} >
          {/* Cliente */}
          <Route element={<ClientLayout />}>
            <Route path="/client/dashboard" element={<DashboardClient />} />
            <Route path="/client/carritoCliente" element={<CarritoCliente />} />
            <Route path="/client/PagocarritoCliente" element={<PagoCarritoCliente />} />
            <Route path="/client/Gimnasios" element={<Gimnasios />} />
            <Route path="/client/GimnasioDetalle" element={<GimnasioDetalle />} />
            <Route path="/client/PagoMembresia" element={<PagoMembresia />} />
            <Route path="/client/tienda" element={<Tienda />} />
            <Route path="/client/productoDetalle/:id" element={<ProductoDetalle/>} />
            <Route path="/client/perfil/:id" element={<Perfil/>} />
          </Route>

          {/* Admin */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>

              {/* Redirección */}
              <Route path="/admin/productos" element={<ProductosAdmin />} />
              <Route path="/admin/gimnasios/agregar" element={<AgregarGimnasio />} />
              <Route path="/admin/gimnasios" element={<GimnasiosAdmin />} />
              <Route path="/admin/membresias" element={<Membresias />} />
              <Route path="/admin/pedidos" element={<Pedidos />} />
              <Route path="/admin/verificaciones" element={<VerificarCorreoAdmin />} />
              <Route path="/admin/dashboard" element={<DashboardAdmin />} />
              <Route path="/admin/perfil" element={<PerfilAdmin />} />
            </Route>
          </Route>
        </Route>

      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
