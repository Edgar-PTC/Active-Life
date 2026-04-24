import { useState, useEffect } from "react";
import { Link } from "react-router"
import TableProdu from "../../Components/TableProdAd";
import ModalProductos from "../../Components/ModalProductoAdm";
import ModalProveedores from "../../Components/ModalProveedorAdm"

const Products = [
  { id: 1, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Botella de agua 250ml", category: "Accesorios", price: 30.00, stock: 13, estado: true },
  { id: 2, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Mancuernas 5kg", category: "Ropa", price: 20.90, stock: 20, estado: true },
  { id: 3, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Proteína Whey 2kg", category: "Ropa", price: 19.80, stock: 30, estado: true },
  { id: 4, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Mat de Yoga Pro", category: "Equipamiento", price: 21.60, stock: 7, estado: true },
  { id: 5, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Mat de Yoga Pro", category: "Equipamiento", price: 33.70, stock: 19, estado: true },
  { id: 6, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Mat de Yoga Pro", category: "Accesorios", price: 27.40, stock: 25, estado: true }
];

const ProductosAdmin = () => {
    const [isProvModalOpen, setIsProvModalOpen] = useState(false);
    const [isProdModalOpen, setIsProdModalOpen] = useState(false);

    const openProvModal = () => { setIsProvModalOpen(true) };
    const closeProvModal = () => { setIsProvModalOpen(false) };

    const openProdModal = () => { setIsProdModalOpen(true) };
    const closeProdModal = () => { setIsProdModalOpen(false) };

    return(
        <main className="flex p-8 h-full min-h-screen"  style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-col gap-6 w-full">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start gap-3 items-center" style={{color: 'var(--brown)', filter: "opacity(0.7)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-icon lucide-folder"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                        <h2 className="text-2xl">Gestión de Productos</h2>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button button onClick={openProdModal} className="flex cursor-pointer items-center gap-4 text-white rounded-xl justify-center pb-2 pt-2 pr-4 pl-4" style={{backgroundColor: "var(--green_7F9E7A)"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                            <p>Nuevo Producto</p>
                            <ModalProductos isOpen={isProdModalOpen} onClose={closeProdModal}></ModalProductos>
                        </button>
                        <button button onClick={openProvModal} className="flex cursor-pointer items-center gap-4 text-white rounded-xl justify-center pb-2 pt-2 pr-4 pl-4" style={{backgroundColor: "var(--green_7F9E7A)"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                            <p>Nuevo Proveedor</p>
                            <ModalProveedores isOpen={isProvModalOpen} onClose={closeProvModal}></ModalProveedores>
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="flex flex-row w-full" style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr'}}>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Imagen
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Nombre del Producto
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Categoria
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Precio                                    
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Stock
                                </th>
                                <th className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {Products.map((Produ) => (
                                Produ.estado === true ? (
                                    <TableProdu key={Produ.id} Produ={Produ}/>
                                ) : null
                            ))}
                            <tr>
                                <td className="flex flex-row w-full justify-between px-6 py-4 items-center">
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
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}

export default ProductosAdmin