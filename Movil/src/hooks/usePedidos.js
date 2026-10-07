/**
 * Pedidos del cliente — usa POST /sales/salesClient (el mismo endpoint que trae
 * las "ventas" en usePerfil).
 *
 * El backend devuelve los pedidos del más antiguo al más reciente (ORD-0001 es el
 * primero); aquí se invierten para mostrar primero lo último que compró.
 * `items`, `deliveryAddress` y `paymentMethod` pueden no venir si el backend
 * desplegado es anterior: la UI lo tolera.
 */
import { useCallback, useState } from 'react';

import { apiUrl } from '@/constants/config';

export default function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargar = useCallback(async (clientId) => {
    if (!clientId) return;
    setCargando(true);
    setError('');
    try {
      const res = await fetch(apiUrl('/sales/salesClient'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ clientId }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || 'No se pudieron cargar tus pedidos');
        return;
      }
      setPedidos([...(json.data || [])].reverse());
    } catch (err) {
      console.log('Error cargando pedidos:', err);
      setError('No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  }, []);

  return { pedidos, cargando, error, cargar };
}
