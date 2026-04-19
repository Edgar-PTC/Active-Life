// Se importan los componentes de react-router-dom, nuevas dependencias que determinan en que paginas se muestran diferentes navs
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Se importan los navs y las paginas
import Nav from "./Components/Nav1_Web";
import Home from "./Pages/Web - Client/Inicio";
import Us from "./Pages/Web - Client/Nosotros";
import Acceder from "./Pages/Web - Client/Acceder";

// Se crea un objeto para las rutas que iran en el nav publico sin iniciar sesion, este objeto puede contener diferentes componentes, como el Nav u otros elementos como un Footer, pero el contenido preincipal es el de cada ruta
const WebLayout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

// Otro objeto para agregar la ruta de las interfaces que iran en el nav. Aqui como solo estan las rutas de las interfaces, solamentes eso se muestra, sin ningun otro contenido
const AuthLayout = () => {
  return (
    <Outlet />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas CON navbar */}
        <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/us" element={<Us />} />
        </Route>

        {/* Rutas SIN navbar */}
        <Route element={<AuthLayout />}>
          <Route path="/inicioSesion" element={<Acceder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;