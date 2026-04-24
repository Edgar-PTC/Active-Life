import { useState, useEffect, createElement } from "react";
import BarraBusqueda from "../../Components/BarraBusqueda";
import CardGimnasio from "../../Components/CardGimnasio";
import { Link } from "react-router";
import CardProductDashClient from "../../Components/CardProductDashClient";

const Array = [
    { "id": "PR001", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png", "name": "Botella de Agua 250ml", "precioUni": 25.00 },
    { "id": "PR002", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00 },
    { "id": "PR003", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00 },
    { "id": "PR004", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00 },
    { "id": "PR005", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png", "name": "Botella de Agua 250ml", "precioUni": 25.00 },
    { "id": "PR006", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png", "name": "Botella de Agua 250ml", "precioUni": 25.00 },
    { "id": "PR007", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png", "name": "Botella de Agua 250ml", "precioUni": 25.00 },
    { "id": "PR008", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00 }
]

const Tienda = () => {
    const [ArrayProductos, setArrayProductos] = useState(Array);

    return (
        <main className="flex p-8 h-full min-h-screen" style={{ background: 'var(--green_CFD9C7)' }}>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex gap-3">
                    {/* Barra de búsqueda */}
                    <BarraBusqueda />

                    {/* Botón con ícono de filtro */}
                    <button type="button" className="bg-[#7a9e6e] rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-filter"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227" /></svg>
                    </button>

                </div>
                {/* Tarjetas con los productos de la tienda */}
                <div className="flex flex-col items-start gap-2 p-0">
                    <div className="flex flex-row gap-3 grid grid-cols-4">
                        {ArrayProductos.map((Producto, index) => (
                            <CardProductDashClient Producto={Producto} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Tienda;