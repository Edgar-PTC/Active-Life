import { Link } from "react-router"

function Nav_Admin() {
    return(
        <nav className="NavAdmin" style={{background: 'var(--green_7F9E7A)',}}>
            <img className="ImgNav" src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="" />
            <ul className="NavwebUl">
                <Link to="/admin/dashboard" className="LinkNavAd">Dashboard</Link>
                <Link to="/admin/productos" className="LinkNavAd">Productos</Link>
                <Link to="/admin/gimnasios" className="LinkNavAd">Gimnasios</Link>
                <Link to="/admin/pedidos" className="LinkNavAd">Pedidos</Link>
            </ul>
        </nav>
    )
}

export default Nav_Admin;