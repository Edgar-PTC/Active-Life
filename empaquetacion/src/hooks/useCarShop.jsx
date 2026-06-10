import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const useCarShop = () => {
    const [ carrito, setCarrito ] = useState(() => {
        return localStorage.getItem("authCarShop") || []
    });

    const guardarLocalCarrito = (idProducto, cantidad) => {
        try {
            const carritoGuardado = localStorage.getItem("authCarShop");
            const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : { productos: [] };

            const productoExistente = carrito.productos.find(p => p.productId === idProducto);
            const cantidadNumber = parseInt(cantidad);

            if (productoExistente) {
                productoExistente.quantity += cantidadNumber;
            } else {
                carrito.productos.push({
                    productId: idProducto,
                    quantity: cantidadNumber
                });
            }

            // Guardar en localStorage
            localStorage.setItem("authCarShop", JSON.stringify(carrito));
        } catch (error_) {
            console.log("Error: " + error_);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }
    }

    const cargarCarrito = async (idClient) => {
        try {
            const res = await fetch("http://localhost:4000/apiActiveLife/carShop/searchByClient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "customerId": idClient
                }),
                credentials: "include",
            });

            if(!res){
                Swal.fire({
                    position: "top-end",
                    title: 'Error interno del servidor',
                    icon: 'error',
                    timer: 2500
                });
                return;
            }

            if(res.ok){
                const json = await res.json();
                console.log(json);
                return;
            }
        } catch (error_) {
            console.log("Error: " + error_);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }
    }

    return{
        carrito,
        cargarCarrito,
        guardarLocalCarrito
    }
}

export default useCarShop;