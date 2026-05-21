import { Link } from "react-router"
import { useState, useEffect } from "react";

const AccederAdmin = () => {
    return(
        <main className="flex p-8 Acceder h-full items-center justify-center min-h-screen">
            <div className="flex flex-col pt-15 pb-15 pl-40 pr-40 rounded-3xl Login items-center justify-between gap-6 w-3/5">
                <div className="flex flex-col items-center justify-center">
                    <img src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="ActiveLife Logo" />
                    <h1 className="text-4xl text-white">INICIO DE SESION</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="CorreoElectronico">Correo Electronico</label>
                        <input className="InputAcceder rounded-lg" type="text" name="CorreoElectronico" id="CorreoElectronico" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="Contraseña">Contraseña</label>
                        <input className="InputAcceder rounded-lg" type="password" name="Contraseña" id="Contraseña" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <Link to="/admin/dashboard" className="AccederLink pt-2 pb-2 pl-10 pr-10 flex flex-row items-center justify-center text-white text-center text-s rounded-lg ">
                    Iniciar Sesion
                    </Link>
                    <Link to="/inicioSesion" className="text-xs text-white">Inicio de Sesion</Link>
                </div>
            </div>
        </main>
    )
}

export default AccederAdmin;