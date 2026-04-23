import React, { useEffect } from 'react';
import { Link } from 'react-router';

const array = [
    {id: 1, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png"},
    {id: 2, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png"},
    {id: 3, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png"},
    {id: 4, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png"},
    {id: 5, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png"},
    {id: 6, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png"},
    {id: 7, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png"}
]

const ModalProveedores = ({ isOpen, onClose }) => {
    // Cerrar con tecla ESC
    useEffect(() => {
        const handleEsc = (event) => {
        if (event.key === 'Escape') {
            onClose();
        }
        };
        
        if (isOpen) {
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden'; // Evita scroll del body
        }
        
        return () => {
        document.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className='flex flex-col py-5 px-10 w-180 h-full rounded-xl' style={{backgroundColor: "var(--green_CFD9C7)"}}>
                    <div onClick={onClose} className='flex flex-row items-center py-4 justify-center gap-3' style={{color: 'var(--brown)', filter: "opacity(0.7)"}}>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                        <div className="flex flex-row justify-start items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-plus-icon lucide-folder-plus"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                            <h2 className="text-xl">Agregar Nuevo Proveedor</h2>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-2 px-10'>
                            <h2 className='text-sm pl-2' style={{color: "var(--brown)", filter: "opacity(0.7)"}}>Fotos del producto</h2>
                                <div className='flex flex-row gap-3 items-end'>
                                    <div className='flex items-start gap-1'>
                                        <label htmlFor="Photo" className="InputPhotoGym flex flex-col rounded-xl items-center justify-center gap-2 h-30 w-30 cursor-pointer">
                                            <svg style={{color: "var(--green_7F9E7A)"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg>
                                            <h2 className="text-xs" style={{color: "var(--brown)", filter: "opacity(0.7)"}}>Añadir</h2>
                                        </label>
                                        <input type="file" name="Photo" id="Photo" style={{display: 'none'}} />
                                    </div>
                                    <div className='flex flex-row gap-3 items-end carruselPhotos'>
                                        {array.map((array) => (
                                            <img key={array.id} className='h-30 w-30 rounded-xl' src={array.image? array.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIkE89ZnTC3yiO2HKI1bPFECC6pPh-bSCRBg&s"} alt="" />
                                        ))}
                                    </div>
                                </div>
                        </div>
                        <div className='flex flex-row gap-2 w-full'>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm' style={{color: "var(--brown)", filter: "opacity(0.7)"}} htmlFor="name">Nombre del Proveedor</label>
                                <input className='bg-white py-2 px-4 rounded-lg' style={{color: "var(--brown)", filter: "opacity(0.7)"}} type="text" name="name" id="name" placeholder='Ej. Distribuidora Ejemplo'/>
                            </div>
                            <div className='flex flex-col gap-1 w-full'>
                                <label className='text-sm' style={{color: "var(--brown)", filter: "opacity(0.7)"}} htmlFor="telefono">Telefono</label>
                                <input className='bg-white py-2 px-4 rounded-lg' style={{color: "var(--brown)", filter: "opacity(0.7)"}} type="number" name="telefono" id="telefono" placeholder='Ej. 0000-0000'/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <label className='text-sm' style={{color: "var(--brown)", filter: "opacity(0.7)"}} htmlFor="email">Correo Electronico</label>
                            <input className='bg-white py-2 px-4 rounded-lg' style={{color: "var(--brown)", filter: "opacity(0.7)"}} type="email" name="email" id="email" placeholder='Ej. distibiudora_ejemplo@gmail.com'/>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm' style={{color: "var(--brown)", filter: "opacity(0.7)"}} htmlFor="Descrip">Direccion</label>
                            <textarea className='bg-white py-2 px-4 rounded-lg' style={{color: "var(--brown)", filter: "opacity(0.7)"}} type="text" name="Descrip" id="Descrip" placeholder='Ej. Avenida ejemplo...'></textarea>
                        </div>
                        <Link className='w-full flex py-2 px-5 rounded-xl items-center justify-center text-white gap-2' style={{backgroundColor: "var(--green_455942)"}} to="/admins/productos">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                            Guardar proveedor
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProveedores;