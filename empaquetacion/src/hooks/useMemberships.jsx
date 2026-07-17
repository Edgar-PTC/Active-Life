import { useState } from "react";
import Swal from "sweetalert2"

const useMemberships = () => {
    const [loadingMembership, setLoadingMembership] = useState(false)

    const API_URL = "http://localhost:4000/apiActiveLife"

    const insertMembership = async (membership) => {
        try {
            setLoadingMembership(true)

            const res = await fetch(`${API_URL}/memberships`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(membership)
            })

            if (!res.ok || !res) {
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo guardar la membresia',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return false;
            }

            Swal.fire({
                position: "top-end",
                title: 'Membresia guardada correctamente',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false,
            });

            return true;
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
            return false;
        } finally {
            setLoadingMembership(false)
        }
    }

    return {
        loadingMembership,
        insertMembership, // <- Crear una nueva membresia asociada a un gimnasio
    }
}

export default useMemberships;
