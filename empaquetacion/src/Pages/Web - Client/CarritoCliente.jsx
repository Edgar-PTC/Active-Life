import { useState, useEffect } from "react";
import { Link } from "react-router";
import TarjetaProducto from "../../Components/TarjetaProductosCar";
import useCarShop from "../../hooks/useCarShop";
import { useAuth } from "../../Context/clientContext";

const CarritoCliente = () => {
    const { 
        carrito, 
        loading, 
        totalItems,
        guardarLocalCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        cargarCarrito,
        estaEnCarrito,
        obtenerCantidad
    } = useCarShop();

    const { Id } = useAuth();

    const [subtotal, setSubtotal] = useState(0.00);
    const [total, setTotal] = useState(0.00);

    // Calcular totales cada vez que cambia el carrito
    useEffect(() => {
        const nuevoSubtotal = carrito.productos.reduce((acumulador, producto) => {
            return acumulador + (producto.precioUni || 0) * producto.quantity;
        }, 0);

        setSubtotal(nuevoSubtotal);
        setTotal(nuevoSubtotal);
    }, [carrito]);

    const EliminarProducto = (productId) => {
        eliminarDelCarrito(productId);
    };

    const SumarProducto = (productId) => {
        guardarLocalCarrito(productId, 1);
    };

    const RestarProducto = (productId) => {
        const cantidadActual = obtenerCantidad(productId);
        if (cantidadActual > 1) {
            guardarLocalCarrito(productId, -1);
        } else {
            eliminarDelCarrito(productId);
        }
    };

    return (
        <main className="flex flex-col p-8 w-full min-h-screen gap-4" style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-row pad-3 justify-between w-full">
                <h1 className="text-4xl" style={{color: "var(--green_455942)"}}>Mi Carrito</h1>
                <div className="flex flex-row text-white p-3 rounded-xl gap-4 items-center" style={{background: 'var(--green_7F9E7A)', maxHeight: "50px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
                        <circle cx="8" cy="21" r="1"/>
                        <circle cx="19" cy="21" r="1"/>
                        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                    </svg>
                    {totalItems} productos pendientes
                </div>
            </div>
            
            <div className="flex flex-row gap-4 min-h-full" style={{display: 'grid', gridTemplateColumns: '4fr 2fr'}}>
                <div className="CarritoProductos gap-4 flex flex-col p-9 w-full rounded-xl" style={{background: 'var(--green_7F9E7A)'}}>
                    <TarjetaProducto 
                        Array={carrito.productos} 
                        MetodoB={EliminarProducto} 
                        MetodoMas={SumarProducto} 
                        MetodoMenos={RestarProducto}
                    />
                </div>
                
                <div className="h-100 flex flex-col p-6 w-full rounded-xl justify-between" style={{background: 'var(--white)'}}>
                    <div className="flex flex-col h-10 justify-center gap-4">
                        <h2 className="text-center text-lg">Resumen de tu pedido</h2>
                        <hr />
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between text-lg">
                            <p>Subtotal</p>
                            <p><b>${subtotal.toFixed(2)}</b></p>
                        </div>
                        <div className="flex flex-row justify-between text-lg">
                            <p>Descuento</p>
                            <p><b>0.00%</b></p>
                        </div>
                        <div className="flex flex-row justify-between text-2xl">
                            <p>Total</p>
                            <p><b>${total.toFixed(2)}</b></p>
                        </div>
                    </div>
                    
                    <Link to="/client/PagocarritoCliente" 
                          className="flex items-center gap-4 justify-center text-white p-2 rounded-lg cursor-pointer" 
                          style={{background: "var(--green_81A65D)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card-icon lucide-credit-card">
                            <rect width="20" height="14" x="2" y="5" rx="2"/>
                            <line x1="2" x2="22" y1="10" y2="10"/>
                        </svg>
                        <p>Pagar</p>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default CarritoCliente;