import React, { useEffect } from 'react';

const ModalProductos = ({ isOpen, onClose }) => {
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
                <div className='flex flex-col py-5 px-10 w-120 h-full rounded-xl' style={{backgroundColor: "var(--green_CFD9C7)"}}>
                    <div onClick={onClose} className='flex flex-row items-center py-4 justify-center gap-3' style={{color: 'var(--brown)', filter: "opacity(0.7)"}}>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
                        <div className="flex flex-row justify-start items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-plus-icon lucide-folder-plus"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                            <h2 className="text-xl">Agregar Nuevo Gimnasio</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalProductos;