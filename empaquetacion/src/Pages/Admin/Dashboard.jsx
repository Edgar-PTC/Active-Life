import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardProductDashClient from "../../Components/CardProductDashClient";

const orders = [
    { id: 1, image: "https://tse2.mm.bing.net/th/id/OIP.v6YAVdE2rB6nV2WTMInZTQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Carlos Ruiz", address: "Sucursal San Salvador", price: 85.00, state: "Sin recoger" },
    { id: 2, image: "https://tse2.mm.bing.net/th/id/OIP.v6YAVdE2rB6nV2WTMInZTQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Marcos Paz", address: "Sucursal San Marcos", price: 85.00, state: "Sin recoger" },
    { id: 3, image: "https://tse2.mm.bing.net/th/id/OIP.v6YAVdE2rB6nV2WTMInZTQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Elena Martínez", address: "Sucursal San Salvador", price: 35.00, state: "Sin recoger" },
    { id: 4, image: "https://tse2.mm.bing.net/th/id/OIP.v6YAVdE2rB6nV2WTMInZTQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Josue Montes", address: "Sucursal San Salvador", price: 15.00, state: "Sin recoger" },
    { id: 5, image: "https://tse2.mm.bing.net/th/id/OIP.v6YAVdE2rB6nV2WTMInZTQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Mateo Alvelar", address: "Sucursal Apopa", price: 30.00, state: "Sin recoger" }
];

const products = [
    { id: 1, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Botella de agua 250ml", category: "Accesorios", price: 30.00, stock: 13, estado: true },
    { id: 2, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Mancuernas 5kg", category: "Ropa", price: 20.90, stock: 20, estado: true },
    { id: 3, image: "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", name: "Proteína Whey 2kg", category: "Ropa", price: 19.80, stock: 30, estado: true }
];

const DashboardAdmin = () => {
    return (
        <main className="flex flex-col p-8 h-full min-h-screen gap-5" style={{ background: "var(--green_CFD9C7)" }}>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row gap-4 w-full">
                    <div className="flex flex-row justify-between p-6 rounded-xl w-full" style={{ backgroundColor: "#BAC9BC" }}>
                        <div className="flex flex-col">
                            <p className="text-m" style={{ color: "var(--gray)" }}>¡Bienvenido de vuelta!</p>
                            <h2 className="text-4xl" style={{ color: "var(--green_455942)" }}>Edgar Ariel</h2>
                        </div>
                        <Link className="flex items-center justify-center rounded-xl text-white pl-6 pr-6 pt-0 pb-0 text-sm" style={{ backgroundColor: "var(--green_7F9E7A)" }} to={"/"}>Mi perfil</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-10 grid grid-cols-3">
                <section>
                    <div className="w-full mx-auto rounded-2xl bg-[#84A37E] p-6 text-white shadow-lg relative overflow-hidden">
                        <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="75%" viewBox="0 0 24 24"><title xmlns="">card-membership-outline</title><path fill="currentColor" d="M4 13v2h16v-2zM4 2h16q.825 0 1.413.588T22 4v11q0 .825-.587 1.413T20 17h-4v5l-4-2l-4 2v-5H4q-.825 0-1.412-.587T2 15V4q0-.825.588-1.412T4 2m0 8h16V4H4zm0 5V4z" /></svg>
                        </div>
                        <div className="absolute top-4 right-4 bg-[#4ADE80] text-sm px-3 py-1 rounded-full">
                            +12%
                        </div>
                        <p class="text-sm opacity-80">Membresías Activas</p>
                        <div className="flex flex-row items-end gap-3 pb-5">
                            <h2 class="text-4xl font-bold mt-1">1,284</h2>
                            <p class="text-sm opacity-80">miembros</p>
                        </div>
                        <svg class="absolute bottom-0 left-0 w-full h-20 opacity-40" viewBox="0 0 300 100" fill="none">
                            <path d="M0 70 Q50 50 100 70 T200 70 T300 40" stroke="white" stroke-width="4" fill="none" />
                        </svg>
                    </div>
                </section>
                <section>
                    <div className="w-full mx-auto rounded-2xl bg-[#F2EDE4] p-6 text-white shadow-lg">
                        <div className="flex flex-row justify-between items-center gap-2 pb-5" >
                            <div>
                                <span className="flex flex-row gap-2 text-black"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title xmlns="">outline-shopping-bag</title><path fill="#84A37E" d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2z" /></svg><p>Pedidos sin recoger</p></span>
                            </div>
                            <div className="top-4 right-4 bg-[#FFEDD5] text-[#EA580C] text-sm px-3 py-1 rounded-full">
                                5 PENDIENTES
                            </div>
                        </div>
                        <hr className="text-[#94A3B8]" />
                        {orders.map((order) => (
                            <div className="flex flex-row justify-between pt-3 pb-3" key={order.id}>
                                <div className="flex flex-row gap-5">
                                    <span className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-lg mb-4"><img src={order.image} alt="Account" /></span>
                                    <div className="flex flex-col">
                                        <p className="text-black"><strong>{order.name}</strong></p>
                                        <p className="text-[#94A3B8]">{order.address}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-[#84A37E]"><strong>${order.price}</strong></p>
                                    <p className="text-[#94A3B8]">{order.state}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                <div className="w-full mx-auto rounded-2xl bg-[#F2EDE4] p-6 text-white shadow-lg">
                        <div className="flex flex-row justify-start items-center gap-2 pb-5" >
                            <span className="flex flex-row gap-2 text-black"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title xmlns="">star-rounded</title><path fill="#84A37E" d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z" /></svg><p>Productos mas comprados</p></span>
                        </div>
                        <hr className="text-[#94A3B8]" />
                        {products.map((product) => (
                            <div className="flex flex-row justify-start items-center mb-5 mt-5 p-7 gap-5 rounded-2xl bg-[#FFFFFF]" key={product.id}>
                                <div className="flex flex-row gap-5 justify-center items-center">
                                    <img src={product.image} alt={product.name} className="w-25 h-25 flex items-center justify-center rounded-lg"/>
                                </div>
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-black"><strong>{product.name}</strong></p>
                                    <p className="text-[#84A37E]"><strong>${product.price}</strong></p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default DashboardAdmin;