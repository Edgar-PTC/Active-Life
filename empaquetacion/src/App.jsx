import { BrowserRouter as Router, Routes, Route} from "react-router"

import Nav from "./Components/Nav1_Web"
import Home from "./Pages/Web/Inicio"
import Us from "./Pages/Web/Nosotros"
import Acceder from "./Pages/Web/Acceder"

function App() {
  return(
    <>
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/us" element={<Us />} />
          <Route path="/inicioSesion" element={<Acceder />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;