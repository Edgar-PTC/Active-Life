import { useState, useEffect } from "react";
import { Link } from "react-router"
import TableGymAd from "../../Components/TableGymsAd";

const gyms = [
  { id: 1, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776917995/Gemini_Generated_Gym1_auexkn.png", name: "Botella de agua 250ml", memberships: 3, members: 50, city: "San Salvador", estado: true },
  { id: 2, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776917995/Gemini_Generated_Gym1_auexkn.png", name: "Mancuernas 5kg", memberships: 3, members: 30, city: "San Marcos", estado: true },
  { id: 3, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776917995/Gemini_Generated_Gym1_auexkn.png", name: "Proteína Whey 2kg", memberships: 2, members: 52, city: "Apopa", estado: true },
  { id: 4, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776917995/Gemini_Generated_Gym1_auexkn.png", name: "Mat de Yoga Pro", memberships: 4, members: 15, city: "San Salvador", estado: true },
  { id: 5, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776917995/Gemini_Generated_Gym1_auexkn.png", name: "Mat de Yoga Pro", memberships: 3, members: 20, city: "San Marco", estado: true },
  { id: 6, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776917995/Gemini_Generated_Gym1_auexkn.png", name: "Mat de Yoga Pro", memberships: 2, members: 16, city: "San Salvador", estado: true }
];

const GimnasiosAdmin = () => {
    return(
        <main className="flex p-8 h-full min-h-screen"  style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start gap-3 items-center" style={{color: 'var(--brown)', filter: "opacity(0.7)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-icon lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                        <h2 className="text-2xl">Gestión de Gimnasios</h2>
                    </div>
                    <Link to="/admin/gimnasios/agregar" className="flex items-center gap-4 text-white rounded-xl justify-center pb-2 pt-2 pr-4 pl-4" style={{backgroundColor: "var(--green_7F9E7A)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                        <p>Nuevo Gimnasio</p>
                    </Link>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="flex flex-row w-full" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr'}}>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Imagen
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Nombre del gimnasio
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Membresías
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Miembros                                    
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Cuidad
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {gyms.map((gym) => (
                                gym.estado === true ? (
                                    <TableGymAd key={gym.id} Gym={gym}/>
                                ) : null
                            ))}
                            <tr className="flex flex-row w-full justify-between px-6 py-4 items-center">
                                <p className="text-sm" style={{color: "var(--brown)"}}>Mostrando 1-6 de 42 productos</p>
                                <div className="flex flex-row gap-5 justify-between items-center h-10">
                                    <svg className="cursor-pointer" style={{color: 'var(--gray)', filter: "opacity(0.7)"}} xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                                    <div className="flex flex-row gap-2 justify-between items-center h-10">
                                        <p className="w-10 cursor-pointer flex items-center p-2 justify-center text-xs text-white rounded-xl" style={{backgroundColor: "var(--green_81A65D)"}}>1</p>
                                        <p className="cursor-pointer flex items-center p-2 justify-center text-xs rounded-xl">2</p>
                                        <p className="cursor-pointer flex items-center p-2 justify-center text-xs rounded-xl">3</p>
                                    </div>
                                    <svg className="cursor-pointer" style={{color: 'var(--gray)', filter: "opacity(0.7)"}} xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default GimnasiosAdmin