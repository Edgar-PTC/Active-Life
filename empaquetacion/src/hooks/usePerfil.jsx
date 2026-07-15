import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const usePerfil = () => {
    const [ email, setEmail ] = useState("");
    const [ nombre, setNombre ] = useState("");
    const [ Id, setId ] = useState("");
    const [ birthdate, setBirthDate ] = useState("");
    const [ sales, setSales ] = useState([]);

    // usePerfil.jsx

const me = async (id) => {
    try {
        // Guardar el ID
        setId(id);

        // 1. Obtener datos del perfil
        const res = await fetch(`http://localhost:4000/apiActiveLife/clients/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!res.ok) {
            Swal.fire({
                position: "top-end",
                title: 'Error al obtener perfil',
                icon: 'error',
                timer: 2500
            });
            return;
        }

        const json = await res.json();
        setBirthDate(json.birthDate?.split('T')[0]);
        setEmail(json.email);
        setNombre(json.name);

        // 2. Obtener ventas del cliente
        const bodyData = JSON.stringify({ clientId: id });
        console.log("Enviando body:", bodyData); // Debug

        const res2 = await fetch(`http://localhost:4000/apiActiveLife/sales/salesClient`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: bodyData  // ✅ Enviando JSON string correctamente
        });

        console.log("Response status:", res2.status);

        // ✅ CORREGIDO: Leer la respuesta correctamente
        if (!res2.ok) {
            // Intentar leer el mensaje de error
            try {
                const errorData = await res2.json();
                console.log("Error del servidor:", errorData);
                
                if (errorData.message === "El cliente no tiene ventas registradas") {
                    setSales([]); // ✅ Establecer array vacío
                    return;
                }
            } catch (e) {
                console.error("Error al parsear respuesta de error:", e);
            }
            
            Swal.fire({
                position: "top-end",
                title: 'Error al cargar ventas',
                icon: 'error',
                timer: 2500
            });
            return;
        }

        // ✅ Leer la respuesta exitosa
        const json2 = await res2.json();
        console.log("Ventas recibidas:", json2);
        
        // ✅ CORREGIDO: Guardar solo los datos, no todo el objeto
        setSales(json2.data || []);
        
    } catch (error) {
        console.log("Error en me():", error);
        Swal.fire({
            position: "top-end",
            title: 'Error interno del servidor',
            icon: 'error',
            timer: 2500
        });
    }
};

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
        update,
        sales
    }
}

export default usePerfil;