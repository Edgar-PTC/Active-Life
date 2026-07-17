import { useState } from "react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:4000/apiActiveLife";

const usePagoCarrito = () => {
    const [procesando, setProcesando] = useState(false);

    // Ejecuta el flujo completo de pago con Wompi (modo prueba, sin dinero real):
    // 1) genera el token de acceso, 2) simula el cobro con paymentTest,
    // 3) si es aprobado, registra la venta (esto deja el carrito como "completed" en el backend).
    const procesarPago = async ({ clientId, cartId, monto, deliveryAddress }) => {
        setProcesando(true);
        try {
            const resCliente = await fetch(`${API_URL}/clients/${clientId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!resCliente.ok) {
                throw new Error("No se pudo obtener el perfil del cliente");
            }

            const cliente = await resCliente.json();

            const resToken = await fetch(`${API_URL}/wompi/token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!resToken.ok) {
                throw new Error("No se pudo generar el token de Wompi");
            }

            const { access_token } = await resToken.json();

            const resPago = await fetch(`${API_URL}/wompi/paymentTest`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    token: access_token,
                    formData: {
                        monto,
                        emailCliente: cliente.email,
                        nombreCliente: cliente.name,
                        tokenTarjeta: "null",
                    },
                }),
            });

            if (!resPago.ok) {
                throw new Error("No se pudo procesar el pago");
            }

            const pago = await resPago.json();

            // Si Wompi devuelve el indicador de aprobación, se respeta; si no viene
            // (respuesta simulada distinta), se asume aprobado porque es un pago de prueba.
            if (pago?.esAprobada === false) {
                Swal.fire({
                    position: "top-end",
                    title: "Pago rechazado",
                    text: pago.mensaje || "La transacción no fue aprobada",
                    icon: "error",
                    timer: 3000,
                    showConfirmButton: false,
                });
                return false;
            }

            const resVenta = await fetch(`${API_URL}/sales`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    shoppingCartId: cartId,
                    deliveryAddress,
                    paymentMethod: "Tarjeta de crédito",
                    type: "productos",
                }),
            });

            if (!resVenta.ok) {
                throw new Error("El pago se procesó pero no se pudo registrar la venta");
            }

            // El carrito ya quedó marcado como pagado en el servidor; se limpia también
            // la copia local para que useCarShop no lo siga mostrando como activo.
            localStorage.removeItem("authCarShop");

            return true;
        } catch (error) {
            console.error("Error procesando el pago:", error);
            Swal.fire({
                position: "top-end",
                title: "Error al procesar el pago",
                text: error.message,
                icon: "error",
                timer: 3000,
                showConfirmButton: false,
            });
            return false;
        } finally {
            setProcesando(false);
        }
    };

    return { procesando, procesarPago };
};

export default usePagoCarrito;
