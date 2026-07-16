import { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2';

// Evita mandar valores corruptos (ej. el string literal "undefined") como customerId al backend
const esIdValido = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

const useCarShop = () => {
    const [carrito, setCarrito] = useState({ productos: [] });
    const [loading, setLoading] = useState(false);
    const carritoRef = useRef(carrito);

    // Recalcular subtotales/total de un carrito local contra el servidor
    const recalcularCarrito = async (carritoLocal) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/apiActiveLife/carShop/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    products: carritoLocal.productos.map(p => ({
                        productId: p.productId,
                        quantity: p.quantity
                    }))
                }),
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const json = await res.json();

            setCarrito({
                productos: json.products.map(p => ({
                    productId: p.productId,
                    name: p.name,
                    image: p.image,
                    precioUni: p.price,
                    quantity: p.quantity,
                    subtotal: p.subtotal
                })),
                total: json.total
            });
        } catch (error_) {
            console.error("Error recalculando carrito:", error_);
            setCarrito(carritoLocal);
        } finally {
            setLoading(false);
        }
    };

    // Al cargar la página: primero buscar carrito en localStorage.
    // Si existe, recalcular sus totales contra el servidor.
    // Si no existe, buscarlo en el servidor por el cliente autenticado.
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("authCarShop");
        let carritoLocal = null;

        if (carritoGuardado) {
            try {
                carritoLocal = JSON.parse(carritoGuardado);
            } catch (error) {
                console.error("Error parsing carrito:", error);
            }
        }

        if (carritoLocal && carritoLocal.productos && carritoLocal.productos.length > 0) {
            recalcularCarrito(carritoLocal);
        } else {
            const idClient = localStorage.getItem("authId");
            if (esIdValido(idClient)) {
                cargarCarrito(idClient);
            } else {
                setCarrito({ productos: [] });
            }
        }
    }, []);

    // Guardar en localStorage cada vez que cambie el carrito
    useEffect(() => {
        localStorage.setItem("authCarShop", JSON.stringify(carrito));
    }, [carrito]);

    const guardarLocalCarrito = (idProducto, cantidad) => {
        try {
            const cantidadNumber = parseInt(cantidad);
            if (isNaN(cantidadNumber) || cantidadNumber === 0) {
                throw new Error("Cantidad inválida");
            }

            setCarrito(prevCarrito => {
                const productoExistente = prevCarrito.productos.find(p => p.productId === idProducto);

                if (!productoExistente) {
                    // No se puede restar de un producto que no está en el carrito
                    if (cantidadNumber < 0) {
                        return prevCarrito;
                    }
                    return { productos: [...prevCarrito.productos, { productId: idProducto, quantity: cantidadNumber }] };
                }

                const nuevaCantidad = productoExistente.quantity + cantidadNumber;

                const productos = nuevaCantidad > 0
                    ? prevCarrito.productos.map(p =>
                        p.productId === idProducto
                            ? { ...p, quantity: nuevaCantidad }
                            : p
                    )
                    : prevCarrito.productos.filter(p => p.productId !== idProducto);

                return { productos };
            });

        } catch (error_) {
            console.error("Error guardando carrito:", error_);
            Swal.fire({
                position: "top-end",
                title: 'Error al guardar el carrito',
                icon: 'error',
                timer: 2500
            });
        }
    };

    const eliminarDelCarrito = (idProducto) => {
        setCarrito(prevCarrito => ({
            productos: prevCarrito.productos.filter(p => p.productId !== idProducto)
        }));
    };

    const vaciarCarrito = () => {
        setCarrito({ productos: [] });
    };

    const cargarCarrito = async (idClient) => {
        if (!esIdValido(idClient)) {
            Swal.fire({
                position: "top-end",
                title: 'ID de cliente inválido',
                icon: 'warning',
                timer: 2500
            });
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("http://localhost:4000/apiActiveLife/carShop/searchByClient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customerId: idClient }),
                credentials: "include",
            });

            if (res.status === 404) {
                // El cliente aún no tiene un carrito activo, no es un error
                const vacio = { productos: [] };
                setCarrito(vacio);
                localStorage.setItem("authCarShop", JSON.stringify(vacio));
                return vacio;
            }

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const json = await res.json();

            // Actualizar carrito con datos del servidor (aplanar producto poblado)
            if (json && json.products && json.products.length > 0) {
                const carritoActualizado = {
                    productos: json.products.map(p => ({
                        productId: p.productId?._id ?? p.productId,
                        name: p.productId?.name,
                        image: p.productId?.image,
                        precioUni: p.productId?.price,
                        quantity: p.quantity,
                        subtotal: p.subtotal
                    })),
                    total: json.total
                };
                setCarrito(carritoActualizado);
                // También guardar en localStorage para offline
                localStorage.setItem("authCarShop", JSON.stringify(carritoActualizado));
                return carritoActualizado;
            } else {
                // Si no hay productos, mantener carrito vacío
                const vacio = { productos: [] };
                setCarrito(vacio);
                return vacio;
            }

        } catch (error_) {
            console.error("Error cargando carrito:", error_);
            Swal.fire({
                position: "top-end",
                title: 'Error al cargar el carrito',
                text: 'No se pudo sincronizar con el servidor',
                icon: 'error',
                timer: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const sincronizarConServidor = async (idClient) => {
        // Sincronizar carrito local con servidor
        try {
            const res = await fetch("http://localhost:4000/apiActiveLife/carShop/sync", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: idClient,
                    products: carrito.productos.map(p => ({
                        productId: p.productId,
                        quantity: p.quantity
                    }))
                }),
                credentials: "include",
            });

            if (res.ok) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error sincronizando:", error);
            return false;
        }
    };

    // Mantener la referencia al carrito actual disponible para el handler de cierre de pestaña
    useEffect(() => {
        carritoRef.current = carrito;
    }, [carrito]);

    // Guardar el carrito en el servidor al cerrar/ocultar la pestaña usando la Beacon API.
    // navigator.sendBeacon envía la petición de forma asíncrona garantizada aunque la
    // página se esté descargando, algo que fetch/XHR normales no garantizan.
    useEffect(() => {
        const guardarConBeacon = () => {
            const idClient = localStorage.getItem("authId");
            const productos = carritoRef.current.productos;

            if (!esIdValido(idClient) || !productos || productos.length === 0) {
                return;
            }

            const payload = JSON.stringify({
                customerId: idClient,
                products: productos.map(p => ({
                    productId: p.productId,
                    quantity: p.quantity
                }))
            });

            const blob = new Blob([payload], { type: "application/json" });
            navigator.sendBeacon("http://localhost:4000/apiActiveLife/carShop/sync", blob);
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                guardarConBeacon();
            }
        };

        window.addEventListener("pagehide", guardarConBeacon);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            window.removeEventListener("pagehide", guardarConBeacon);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    // Utilidades adicionales
    const totalItems = carrito.productos.reduce((total, item) => total + item.quantity, 0);
    const estaEnCarrito = (idProducto) => {
        return carrito.productos.some(p => p.productId === idProducto);
    };
    const obtenerCantidad = (idProducto) => {
        const producto = carrito.productos.find(p => p.productId === idProducto);
        return producto ? producto.quantity : 0;
    };

    return {
        carrito,
        loading,
        totalItems,
        guardarLocalCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        cargarCarrito,
        sincronizarConServidor,
        estaEnCarrito,
        obtenerCantidad
    };
};

export default useCarShop;