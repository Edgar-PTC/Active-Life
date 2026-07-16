import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useAuth } from "../../Context/clientContext";

const Acceder = () => {
    const { loading, setEmail, setPassword, LogInCliente } = useAuth();
    
    return(
        <main className="flex p-8 Acceder h-full items-center justify-center min-h-screen">
            <form autoComplete="off" onSubmit={LogInCliente} className="flex flex-col pt-15 pb-15 pl-40 pr-40 rounded-3xl Login items-center justify-between gap-6 w-3/5">
                <div className="flex flex-col items-center justify-center">
                    <img src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="ActiveLife Logo" />
                    <h1 className="text-4xl text-white">INICIO DE SESION</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="CorreoElectronico">Correo Electronico</label>
                        <input onChange={(e) => setEmail(e.target.value)} autoComplete="off" className="InputAcceder rounded-lg" type="text" name="CorreoElectronico" id="CorreoElectronico" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="Contraseña">Contraseña</label>
                        <input onChange={(e) => setPassword(e.target.value)} autoComplete="off" className="InputAcceder rounded-lg" type="password" name="Contraseña" id="Contraseña" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <button type="submit" className="AccederLink pt-2 pb-2 pl-10 pr-10 flex flex-row items-center justify-center text-white text-center text-s rounded-lg ">
                    {loading ? "Comprobando...": "Inciar Sesion"}
                    </button>
                    <Link to="/admin/inicioSesion" className="text-xs text-white">Inicio de Sesion Admin</Link>
                    <p className="text-sm pt-2 text-white">¿No tienes cuenta? <Link to="/register" className="text-xs text-blue-800 hover:underline">Registrate</Link></p>
                    <Link to="/Recuperacion" className="text-xs text-white">Recuperar contraseña</Link>
                </div>
            </form>
        </main>
    )
}

export default Acceder;