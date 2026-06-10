import { useState, useEffect, createElement } from "react";
import BarraBusqueda from "../../Components/BarraBusqueda";
import CardGimnasio from "../../Components/CardGimnasio";
import { Link } from "react-router";
import CardProductDashClient from "../../Components/CardProductDashClient";
import useProducts from "../../hooks/useProducts";

const Tienda = () => {
    const { productosArray, getProducts, searchByName } = useProducts();

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <main className="flex p-8 h-full min-h-screen" style={{ background: 'var(--green_CFD9C7)' }}>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex gap-3">
                    {/* Barra de búsqueda */}
                    <BarraBusqueda onChange={searchByName} />

                </div>
                {/* Tarjetas con los productos de la tienda */}
                <div className="flex flex-col items-start gap-2 p-0">
                    <div className="flex-row gap-3 grid grid-cols-4">
                        {productosArray.map((Producto, index) => (
                            <CardProductDashClient Producto={Producto} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Tienda;