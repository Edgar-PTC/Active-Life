import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import Swal from "sweetalert2";
import ModalAgregarMembresia from "./ModalAgregarMembresia";

const TableGymAd = ({ gym, onMembershipAdded, onDelete }) => {
    const [mostrarModalMembresia, setMostrarModalMembresia] = useState(false)

    const manejarEliminar = async () => {
        const confirmacion = await Swal.fire({
            title: "¿Eliminar gimnasio?",
            text: gym.name,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        });

        if (!confirmacion.isConfirmed) return;

        onDelete?.(gym._id);
    }

    return(
        <>
        <tr className="flex flex-row w-full" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', backgroundColor: "rgba(127, 158, 122, 0.15)"}}>
            <td className="py-3 flex justify-center items-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <img src={gym.image ?? "---"} className="w-10 h-10 rounded-lg object-cover" />
                </div>
            </td>
            <td className="justify-center items-center flex py-3 font-medium text-sm text-gray-800">{gym.name}</td>
            <td className="py-3 flex justify-center items-center">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                    {gym.membershipsCount ?? 0}
                </span>
            </td>
            <td className="py-3 justify-center items-center flex text-sm text-gray-700">{gym.members ?? "---"}</td>
            <td className="py-3 justify-center items-center flex text-sm text-gray-500">{gym.city}</td>
            <td className="py-3 justify-center items-center flex">
                <div className="flex flex-row gap-4 items-center justify-center">
                    <Link to={`/admin/gimnasios/${gym._id}/editarGimnasio`}>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--brown)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen">
                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
                        </svg>
                    </Link>
                    <svg onClick={manejarEliminar} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--pink)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash">
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    <svg
                        onClick={() => setMostrarModalMembresia(true)}
                        className="cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{color: "var(--green_7F9E7A)"}}
                        width="1.1rem" height="1.1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <title>Agregar membresía</title>
                        <circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>
                    </svg>
                </div>
            </td>
        </tr>
        {mostrarModalMembresia && createPortal(
            <ModalAgregarMembresia
                gymId={gym._id}
                gymName={gym.name}
                onClose={() => setMostrarModalMembresia(false)}
                onSuccess={onMembershipAdded}
            />,
            document.body
        )}
        </>
    )
}

export default TableGymAd;