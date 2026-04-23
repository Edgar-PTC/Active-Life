import { useState, useEffect } from "react";
import { Link } from "react-router"
import CardProductDashClient from "../../Components/CardProductDashClient";

const Array1 = [
    {"id": "PR001", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png", "name": "Botella de Agua 250ml", "precioUni": 25.00, "cantidad": 1},
    {"id": "PR002", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00, "cantidad": 2}
]

const Array2 = [
    {"id": "PR001", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png", "name": "Botella de Agua 250ml", "precioUni": 25.00},
    {"id": "PR002", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00},
    {"id": "PR003", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00},
    {"id": "PR004", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00}
]

const DashboardClient = () => {
    const[ArrayCarrito, setArrayCarrito] = useState(Array1)
    const[ArrayProductos, setArrayProductos] = useState(Array2)

    return(
        <main className="flex p-8 h-full min-h-screen"  style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row gap-4 w-full" style={{display: 'grid', gridTemplateColumns: '5fr 2fr'}}>
                    <div className="flex flex-row justify-between p-6 rounded-xl w-full" style={{backgroundColor: "#BAC9BC"}}>
                        <div className="flex flex-col">
                            <p className="text-m" style={{color: "var(--gray)"}}>¡Bienvenido de vuelta!</p>
                            <h2 className="text-4xl" style={{color: "var(--green_455942)"}}>Edgar Ariel</h2>
                        </div>
                        <Link className="flex items-center justify-center rounded-xl text-white pl-6 pr-6 pt-0 pb-0 text-sm" style={{backgroundColor: "var(--green_7F9E7A)"}} to="/">Mi perfil</Link>
                    </div>
                    <Link to="/client/carritoCliente"  className="flex flex-row rounded-xl items-center gap-3 p-4 justify-center" style={{backgroundColor: "#BAC9BC"}}>
                        <div className="p-4 rounded-full" style={{ backgroundColor: "var(--green_7F9E7A)"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="#ffffff" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                        </div>
                        <div className="flex flex-col gap-0 cursor-pointer">
                            <h2 className="text-2xl" style={{color: "var(--green_455942)"}}>Completa tu pedido</h2>
                            <p className="text-sm" style={{color: "var(--gray)"}}>{ArrayCarrito.length} {ArrayCarrito.length > 1? "Productos":"Producto"} en carrito</p>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col justify-center w-full items-center gap-2 p-0">
                    <div className="flex flex-row justify-between items-end w-full pl-2 pr-2">
                        <p className="text-m" style={{color: "var(--green_455942)"}}>Tu Membresia</p>
                        <Link className="text-sm" style={{color: "var(--green_7F9E7A)"}}>Ver más</Link>
                    </div>
                    <div className="flex rounded-2xl w-full" style={{backgroundColor: 'var(--green_7F9E7A)'}}>
                        <div className="flex flex-row justify-between w-full p-6">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-2 items-center">
                                        <h1 className="text-white text-4xl">Fitness Fusion</h1>
                                        <div className="rounded-xl text-white pl-4 pt-1 pb-1 pr-4 text-xs" style={{background: "rgba(255, 255, 255, 0.45)"}}>Platino</div>
                                    </div>
                                    <div className="flex flex-row text-white items-center text-m gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-icon lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                                        <p>San Salvador, Apopa</p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-0">
                                    <p style={{color: "var(--gray)"}} className="text-xs ">PERIODO</p>
                                    <div className="flex flex-row gap-2 items-end">
                                        <h2 className="text-white text-2xl">$8.99</h2>
                                        <p className="text-sm" style={{color: "var(--gray)"}}>/month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end justify-end">
                                <p className="text-xs" style={{color: "var(--gray)"}}>Siguiente pago</p>
                                <h2 className="text-2xl text-white">Mar 15, 2026</h2>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="flex flex-col items-start gap-2 p-0">
                    <h2 className="flex justify-start items-center text-lg pl-2" style={{color: "var(--green_455942)"}}>
                        Productos que podrían ser de tu interés
                    </h2>
                    <div className="flex flex-row gap-3">
                        {ArrayProductos.map((Producto, index) => (
                            <CardProductDashClient Producto={Producto} key={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashboardClient;