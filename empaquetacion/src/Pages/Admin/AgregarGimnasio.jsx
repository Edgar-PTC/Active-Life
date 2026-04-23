import { useState, useEffect } from "react";
import { Link } from "react-router"

const AgregarGimnasio = () => {
    return(
        <main className="flex p-8 h-full min-h-screen"  style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row justify-start items-center gap-4" style={{color: 'var(--brown)', filter: "opacity(0.7)"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-plus-icon lucide-folder-plus"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                    <h2 className="text-2xl">Agregar Nuevo Gimnasio</h2>
                </div>
                <div className="flex flex-row w-full gap-3" style={{display: 'grid', gridTemplateColumns: '2fr 3fr'}}>
                    <div className="flex flex-col h-full gap-4 wfull">
                        <div className="flex flex-col wfull">
                            <label htmlFor="Photo" className="InputPhotoGym flex flex-col rounded-xl items-center justify-center gap-2 h-70 w-full">
                                <div className="flex items-center justify-center rounded-full p-4" style={{backgroundColor: "var(--green_CFD9C7)"}}>
                                    <svg style={{color: "var(--green_7F9E7A)"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg>
                                </div>
                                <h2 className="text-xl" style={{color: 'var(--green_455942)'}}>Subir fotos (sin límite)</h2>
                                <p className="text-xs w-90 text-center" style={{color: "var(--gray)", filter: "opacity(0.7)"}}>Arrastra tus fotos aquí o haz clic para seleccionarlas. Formatos soportados: JPG, PNG.</p>
                            </label>
                            <input type="file" name="Photo" id="Photo" style={{display: 'none'}} />
                        </div>
                        <div className="flex flex-col p-6 rounded-xl" style={{backgroundColor: "rgba(127, 158, 122, 0.5)"}}>
                            <div className="flex flex-col gap-2">
                                <hr className="text-white" />
                                <div className="flex flex-row justify-between py-2 px-2 items-center">
                                    <div className="flex flex-col gap-0">
                                        <h2 className="text-xl" style={{color: "var(--gray)"}}>Membresia 1</h2>
                                        <p className="text-sm" style={{color: "var(--gray)", filter: "opacity(0.7)"}}>Precio y periodo de pago</p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center justify-center">
                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--brown)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--pink)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <hr className="text-white" />
                                <div className="flex flex-row justify-between py-2 px-2 items-center">
                                    <div className="flex flex-col gap-0">
                                        <h2 className="text-xl" style={{color: "var(--gray)"}}>Membresia 2</h2>
                                        <p className="text-sm" style={{color: "var(--gray)", filter: "opacity(0.7)"}}>Precio y periodo de pago</p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center justify-center">
                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--brown)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--pink)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <hr className="text-white" />
                                <div className="flex flex-row justify-between py-2 px-2 items-center">
                                    <div className="flex flex-col gap-0">
                                        <h2 className="text-xl" style={{color: "var(--gray)"}}>Membresia 3</h2>
                                        <p className="text-sm" style={{color: "var(--gray)", filter: "opacity(0.7)"}}>Precio y periodo de pago</p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center justify-center">
                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--brown)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen-icon lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/></svg>
                                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--pink)"}} width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex p-6 flex-col gap-6 rounded-xl" style={{backgroundColor: "rgba(127, 158, 122, 0.5)"}}>
                            <div className="flex flex-col w-full gap-1 items-start">
                                <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="NameGym">Nombre del Gimnasio</label>
                                <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="NameGym" id="NameGym" placeholder="Ej: Fitness Fusion Elite"/>
                            </div>
                            <div className="flex flex-col w-full gap-1 items-start">
                                <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="AdressGym">Dirección Completa</label>
                                <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="AdressGym" id="AdressGym" placeholder="Calle, número, colonia..."/>
                            </div>
                            <div className="flex flex-row gap-3">
                                <div className="flex flex-col w-full gap-1 items-start">
                                    <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="CiudadGym">Cuidad</label>
                                    <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="CiudadGym" id="CiudadGym" placeholder="Ej: San Salvador"/>
                                </div>
                                <div className="flex flex-col w-full gap-1 items-start">
                                    <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="MunicipioGym">Municipio</label>
                                    <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="MunicipioGym" id="MunicipioGym" placeholder="Ej: San Marcos"/>
                                </div>
                            </div>
                            <hr className="text-white" />
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-col">
                                    <h2 className="text-lg" style={{color: "var(--gray)"}}>Planes y Membresías</h2>
                                    <p className="text-xs" style={{color: "var(--gray)", filter: "opacity(0.7)"}}>Configura los precios y beneficios para este local.</p>
                                </div>
                                <Link to='/admin/gimnasios/agregar/membresias' className="px-6 py-2 rounded-xl text-sm cursor-pointer" style={{border: "2px solid var(--green_455942)", color: "var(--gray)"}}>Agregar Membresias</Link>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end items-center gap-6">
                            <Link className="text-md flex items-center justify-center" style={{color: "var(--gray)"}} to="/admin/gimnasios">Cancelar</Link>
                            <Link to="/admin/gimnasios" className="rounded-xl flex items-center gap-2 justify-center py-2 px-12 text-white" style={{backgroundColor: "var(--green_455942)"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save-icon lucide-save"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
                                Guardar Gimnasio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AgregarGimnasio;