import { Link } from "react-router"
import { useState, useEffect, useRef } from 'react';

function Nav1_Web() {
    //Variable usada para determinar el estado solido
    const [isSolid, setIsSolid] = useState(false);

    useEffect(() => {
        const hero = document.querySelector('first');
        const handleScroll = () => {
        setIsSolid(window.scrollY >= hero.offsetTop + hero.offsetHeight);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <nav className="NavWeb" style={{background: isSolid ? 'var(--green_#7F9E7A)' : 'transparent',}}>
            <img className="ImgNav" src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="" />
            <ul className="NavwebUl">
                <Link to="/" className="LinkNav">Inicio</Link>
                <Link to="/us" className="LinkNav">Nosotros</Link>
                <Link to="/inicioSesion" className="LinkNav">Acceder</Link>
            </ul>
        </nav>
    )
}

export default Nav1_Web;