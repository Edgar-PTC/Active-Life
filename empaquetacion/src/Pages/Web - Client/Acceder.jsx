import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const Acceder = () => {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const LogIn = async(event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if(!email || !password){
                Swal.fire({
                    position: "top-end",
                    title: 'Completa ambos campos para verificar tu identidad',
                    icon: 'error',
                    timer: 2500
                });
                return;
            }

            const response = await fetch("http://localhost:4000/apiActiveLife/logInClients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                }),
                credentials: "include",
            });

            if(!response.ok){
                const json = await response.json();
                if(json.message == "Email not found"){
                    Swal.fire({
                        position: "top-end",
                        title: 'No existe ningun usuario con este correo',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                }
                if(json.message == "Cuenta bloqueada"){
                    let time = parseFloat(json.time / 60 /1000);
                    time = time.toFixed(0)
                    Swal.fire({
                        position: "top-end",
                        title: `Cuenta bloqueada. Espera ${time} minutos`,
                        icon: 'error',
                        timer: json.time,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }
                if(json.message == "Contraseña incorrecta"){
                    Swal.fire({
                        position: "top-end",
                        title: 'Contraseña incorrecta. Intentalo de nuevo',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                }
                return;
            }

            Swal.fire({
                position: "top-end",
                title: 'Inicio de sesion exitoso. ¡Bienvenido!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                willClose: () => {
                    navigate("/client/dashboard");
                }
            });
        } catch (error_) {
            console.log("Error: " + error_);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }finally{
            setLoading(false);
        }
    }
    
    return(
        <main className="flex p-8 Acceder h-full items-center justify-center min-h-screen">
            <form autoComplete="off" onSubmit={LogIn} className="flex flex-col pt-15 pb-15 pl-40 pr-40 rounded-3xl Login items-center justify-between gap-6 w-3/5">
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
                </div>
            </form>
        </main>
    )
}

export default Acceder;