/**
 * Pago del carrito — port de `empaquetacion/src/hooks/usePagoCarrito.jsx`.
 *
 * Flujo Wompi en modo prueba (sin dinero real):
 *   1) GET /clients/:id            -> datos del cliente (email, nombre)
 *   2) POST /wompi/token           -> access_token
 *   3) POST /wompi/paymentTest     -> simula el cobro
 *   4) si no fue rechazado, POST /sales registra la venta (marca el carrito como pagado)
 *   5) se limpia el carrito local
 *
 * Cambios web -> native: Swal.fire(...) -> Alert nativo. Nada más.
 */
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { apiUrl } from '@/constants/config';
import { clearLocalCart } from '@/lib/cartStorage';

export default function usePagoCarrito() {
  const [procesando, setProcesando] = useState(false);

  const procesarPago = useCallback(async ({ clientId, cartId, monto, deliveryAddress }) => {
    setProcesando(true);
    try {
      const resCliente = await fetch(apiUrl(`/clients/${clientId}`), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!resCliente.ok) throw new Error('No se pudo obtener el perfil del cliente');
      const cliente = await resCliente.json();

      const resToken = await fetch(apiUrl('/wompi/token'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!resToken.ok) throw new Error('No se pudo generar el token de Wompi');
      const { access_token } = await resToken.json();

      const resPago = await fetch(apiUrl('/wompi/paymentTest'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          token: access_token,
          formData: {
            monto,
            emailCliente: cliente.email,
            nombreCliente: cliente.name,
            tokenTarjeta: 'null',
          },
        }),
      });
      if (!resPago.ok) throw new Error('No se pudo procesar el pago');
      const pago = await resPago.json();

      // Si Wompi marca el rechazo explícitamente se respeta; si no viene el flag,
      // se asume aprobado porque es un pago de prueba.
      if (pago?.esAprobada === false) {
        Alert.alert('Pago rechazado', pago.mensaje || 'La transacción no fue aprobada');
        return false;
      }

      const resVenta = await fetch(apiUrl('/sales'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          shoppingCartId: cartId,
          deliveryAddress,
          paymentMethod: 'Tarjeta de crédito',
          type: 'productos',
        }),
      });
      if (!resVenta.ok) throw new Error('El pago se procesó pero no se pudo registrar la venta');

      await clearLocalCart();
      return true;
    } catch (error) {
      console.log('Error procesando el pago:', error);
      Alert.alert('Error al procesar el pago', error.message ?? 'Inténtalo de nuevo');
      return false;
    } finally {
      setProcesando(false);
    }
  }, []);

  return { procesando, procesarPago };
}
