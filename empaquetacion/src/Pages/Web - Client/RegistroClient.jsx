import { Link, useNavigate } from "react-router"
import { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2'

const Register = () => {
    const navigate = useNavigate();
    const [ name, setName ] = useState("");
    const [ birthDate, setBirthdate ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [loading, setLoading] = useState(false);

    const registerFunction = async (event) => {
        event.preventDefault();

        if(!name.trim() || !birthDate.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()){
            Swal.fire({
                position: "top-end",
                title: 'Por favor complete todos los datos',
                icon: 'error',
                timer: 2500
            });
            return;
        }

        if(password.length < 5){
            Swal.fire({
                position: "top-end",
                title: 'La contraseña debe contener almenos 5 caracteres',
                icon: 'error',
                timer: 2500
            });
            return;
        }

        if(password !== confirmPassword){
            Swal.fire({
                position: "top-end",
                title: 'La confirmacion de contraseña no coincide con la contraseña',
                icon: 'error',
                timer: 2500
            });
            return;
        }

        setLoading(true);
        try {
            const json = {
                "name": name,
                "birthDate": birthDate,
                "email": email,
                "password": password
            }

            const response = await fetch("http://localhost:4000/apiActiveLife/registerClients/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
                credentials: "include",
            });

            if(!response.ok){
                const json = await response.json();
                if(response.message == "Campos incompletos"){
                    Swal.fire({
                        position: "top-end",
                        title: 'Todos los campos deben ser rellenados',
                        icon: 'error',
                        timer: 2500
                    });
                }else if(response.message == "Fecha invalida"){
                    Swal.fire({
                        position: "top-end",
                        title: 'La fecha no puede ser hoy o una fecha futura',
                        icon: 'error',
                        timer: 2500
                    });
                }else if(response.message == "email already in use"){
                    Swal.fire({
                        position: "top-end",
                        title: 'El correo ingresado ya le pertenece a otro usuario',
                        icon: 'error',
                        timer: 2500
                    });
                }else if(response.message == "Password invalid"){
                    Swal.fire({
                        position: "top-end",
                        title: 'La fecha no puede ser hoy o una fecha futura',
                        icon: 'error',
                        timer: 2500
                    });
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor. Vuelve a intentarlo',
                        icon: 'error',
                        timer: 2500
                    });
                }
                return;
            }
            
            Swal.fire({
                position: "top-end",
                title: 'Registro exitoso. Pasando a la verificacion de correo',
                icon: 'success',
                timer: 2500,
                willClose: () => {
                    navigate("/verificarCorreo");
                }
            });
        } catch (error_) {
            setError(error_.message || "Error interno, volver a intentar")
        } finally {
            setLoading(false);
        }
    }

    return(
        <main className="flex p-8 Acceder h-full items-center justify-center min-h-screen">
            <form onSubmit={registerFunction} className="flex flex-col pt-15 pb-15 pl-40 pr-40 rounded-3xl Login items-center justify-between gap-6 w-3/5">
                <div className="flex flex-col items-center justify-center">
                    <img src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="ActiveLife Logo" />
                    <h1 className="text-3xl text-white">REGISTRARSE</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="Name">Nombre:</label>
                        <input onChange={(e) => setName(e.target.value)} className="InputAcceder rounded-lg" type="text" name="Name" id="Name" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="birthDate">Fecha de nacimiento:</label>
                        <input onChange={(e) => setBirthdate(e.target.value)} className="InputAcceder rounded-lg text-xl" type="date" name="birthDate" id="birthDate" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="CorreoElectronico">Correo Electronico:</label>
                        <input onChange={(e) => setEmail(e.target.value)} className="InputAcceder rounded-lg" type="text" name="CorreoElectronico" id="CorreoElectronico" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="NewNewContraseña">Crear Contraseña</label>
                        <input onChange={(e) => setPassword(e.target.value)} className="InputAcceder rounded-lg" type="password" name="NewContraseña" id="NewContraseña" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="ComfirmContraseña">Confirmar Contraseña:</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} className="InputAcceder rounded-lg" type="password" name="ConfirmContraseña" id="ConfirmContraseña" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="AccederLink pt-2 pb-2 pl-10 pr-10 flex flex-row items-center justify-center text-white text-center text-s rounded-lg "
                    >
                    Registrarse
                    </button>
                </div>
            </form>
        </main>
    )
}

export default Register;