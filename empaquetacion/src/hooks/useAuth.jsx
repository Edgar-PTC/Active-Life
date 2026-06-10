import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

const useAuth = () => {
    const [ Nombre, setNombre ] = useState("");
    const [ Id, setId ] = useState("");
    const navigate = useNavigate();

    const verify = async () => {
        try {
            const res = await fetch("http://localhost:4000/apiActiveLife/auth/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })

            if(!res.ok){
                Swal.fire({
                    position: "top-end",
                    title: 'Error interno del servidor',
                    icon: 'error',
                    timer: 2500
                });
                navigate("/inicioSesion");
            }

            const json = await res.json();
            console.log(json);
            setId(json.Id);
            setNombre(json.Nombre);
            return;
        } catch (error) {
            console.log("Error: " + error_);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }
    }

    return{
        Nombre,
        Id,
        verify
    }
}

export default useAuth;