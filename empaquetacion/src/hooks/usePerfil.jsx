import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const usePerfil = () => {
    const [ email, setEmail ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ Id, setId ] = useState("");
    const [ birthdate, setBirthDate ] = useState("");

    const me = async (id) => {
        try {
            setId(id);

            const res = await fetch(`http://localhost:4000/apiActiveLife/clients/${id}`, {
                method: "GET",
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
                return;
            }

            const json = await res.json();
            setBirthDate(json.birthDate?.split('T')[0]);
            setEmail(json.email);
            setNombre(json.name)
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }
    }

    const update = async (data) => {
        try {
            const jsonData = JSON.stringify(data);
            const res = await fetch(`http://localhost:4000/apiActiveLife/clients/${Id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: jsonData
            })

            if(!res.ok){
                Swal.fire({
                    position: "top-end",
                    title: 'Error interno del servidor',
                    icon: 'error',
                    timer: 2500
                });
                return;
            }

            const json = await res.json();
            await me(Id);
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }
    }

    return{
        email,
        nombre,
        birthdate,
        me,
        update
    }
}

export default usePerfil;