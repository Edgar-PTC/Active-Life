/**
 * Carrito de compras (Context) — port de `empaquetacion/src/hooks/useCarShop.jsx`.
 *
 * En web `useCarShop` era un hook por pantalla que se sincronizaba solo gracias a
 * que localStorage es síncrono. En native AsyncStorage es asíncrono, así que el
 * carrito vive en UN Context compartido por Carrito, PagoCarrito y ProductoDetalle.
 *
 * Otros cambios web -> native (no son features nuevas):
 *   - localStorage            -> AsyncStorage vía lib/cartStorage
 *   - navigator.sendBeacon / pagehide / visibilitychange  -> se quitan; la subida al
 *     servidor se hace a mano con sincronizarConServidor() antes de pagar
 *   - Swal.fire(...)          -> Alert nativo
 *   - el clientId sale de useAuth()
 *
 * API de useCarShop() idéntica a la web:
 *   carrito, loading, totalItems, guardarLocalCarrito, eliminarDelCarrito,
 *   vaciarCarrito, cargarCarrito, sincronizarConServidor, estaEnCarrito, obtenerCantidad
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';

import { apiUrl } from '@/constants/config';
import { useAuth } from '@/context/session-context';
import { getLocalCart, setLocalCart } from '@/lib/cartStorage';

const esIdValido = (id) => typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);
const notify = (msg) => Alert.alert('Carrito', msg);

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const { Id } = useAuth();
  const [carrito, setCarrito] = useState({ productos: [] });
  const [loading, setLoading] = useState(false);
  const hydrated = useRef(false);

  /** Recalcula precios/subtotales de un carrito local contra el servidor. */
  const recalcularCarrito = useCallback(async (carritoLocal) => {
    setLoading(true);
    try {
      const res = await fetch(apiUrl('/carShop/calculate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          products: carritoLocal.productos.map((p) => ({
            productId: p.productId,
            quantity: p.quantity,
          })),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setCarrito({
        productos: json.products.map((p) => ({
          productId: p.productId,
          name: p.name,
          image: p.image,
          precioUni: p.price,
          quantity: p.quantity,
          subtotal: p.subtotal,
        })),
        total: json.total,
      });
    } catch (error) {
      console.log('Error recalculando carrito:', error);
      setCarrito(carritoLocal); // sin conexión: al menos mostramos lo local
    } finally {
      setLoading(false);
    }
  }, []);

  /** Trae el carrito activo del cliente desde el servidor. */
  const cargarCarrito = useCallback(
    async (idClient) => {
      const clientId = idClient ?? Id;
      if (!esIdValido(clientId)) return { productos: [] };

      setLoading(true);
      try {
        const res = await fetch(apiUrl('/carShop/searchByClient'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ clientId }),
        });

        if (res.status === 404) {
          const vacio = { productos: [] };
          setCarrito(vacio);
          await setLocalCart(vacio);
          return vacio;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        // searchByClient devuelve products[].productId poblado ({_id,name,price,image})
        const productos = (json.products || []).map((p) => ({
          productId: p.productId?._id ?? p.productId,
          name: p.productId?.name,
          image: p.productId?.image,
          precioUni: p.productId?.price,
          quantity: p.quantity,
          subtotal: p.subtotal,
        }));
        const actualizado = { productos, total: json.total };
        setCarrito(actualizado);
        await setLocalCart(actualizado);
        return actualizado;
      } catch (error) {
        console.log('Error cargando carrito:', error);
        notify('No se pudo sincronizar el carrito con el servidor');
        return { productos: [] };
      } finally {
        setLoading(false);
      }
    },
    [Id],
  );

  // Carga inicial: primero lo local; si tiene items, refrescar precios; si no, pedir al servidor.
  useEffect(() => {
    let cancelado = false;
    (async () => {
      const local = await getLocalCart();
      if (cancelado) return;
      if (local.productos.length > 0) {
        await recalcularCarrito(local);
      } else if (esIdValido(Id)) {
        await cargarCarrito(Id);
      } else {
        setCarrito({ productos: [] });
      }
      hydrated.current = true;
    })();
    return () => {
      cancelado = true;
    };
  }, [Id, recalcularCarrito, cargarCarrito]);

  // Persistir en AsyncStorage cada cambio (después de la hidratación inicial).
  useEffect(() => {
    if (!hydrated.current) return;
    setLocalCart(carrito);
  }, [carrito]);

  const guardarLocalCarrito = useCallback((idProducto, cantidad, meta) => {
    const delta = parseInt(cantidad, 10);
    if (Number.isNaN(delta) || delta === 0) return;

    setCarrito((prev) => {
      const existente = prev.productos.find((p) => p.productId === idProducto);
      if (!existente) {
        if (delta < 0) return prev;
        // `meta` (opcional): {name, image, price} del producto para poder pintar
        // la línea sin esperar al recálculo contra el servidor. La web no lo
        // necesita porque recalcula en cada montaje de pantalla; aquí el
        // CartProvider vive una sola vez, así que la primera pintada usa `meta`.
        const precioUni = meta?.price ?? meta?.precioUni;
        return {
          ...prev,
          productos: [
            ...prev.productos,
            {
              productId: idProducto,
              quantity: delta,
              name: meta?.name,
              image: meta?.image,
              precioUni,
              subtotal: (precioUni || 0) * delta,
            },
          ],
        };
      }
      const nuevaCantidad = existente.quantity + delta;
      const productos =
        nuevaCantidad > 0
          ? prev.productos.map((p) =>
              p.productId === idProducto
                ? { ...p, quantity: nuevaCantidad, subtotal: (p.precioUni || 0) * nuevaCantidad }
                : p,
            )
          : prev.productos.filter((p) => p.productId !== idProducto);
      return { ...prev, productos };
    });
  }, []);

  const eliminarDelCarrito = useCallback((idProducto) => {
    setCarrito((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.productId !== idProducto),
    }));
  }, []);

  const vaciarCarrito = useCallback(() => setCarrito({ productos: [] }), []);

  /** Sube el carrito local al servidor y devuelve el carrito del servidor (con _id). */
  const sincronizarConServidor = useCallback(
    async (idClient) => {
      const clientId = idClient ?? Id;
      if (!esIdValido(clientId)) return null;
      try {
        const res = await fetch(apiUrl('/carShop/sync'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            clientId,
            products: carrito.productos.map((p) => ({
              productId: p.productId,
              quantity: p.quantity,
            })),
          }),
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (error) {
        console.log('Error sincronizando carrito:', error);
        return null;
      }
    },
    [Id, carrito],
  );

  const totalItems = carrito.productos.reduce((acc, p) => acc + p.quantity, 0);

  const estaEnCarrito = useCallback(
    (idProducto) => carrito.productos.some((p) => p.productId === idProducto),
    [carrito],
  );
  const obtenerCantidad = useCallback(
    (idProducto) => carrito.productos.find((p) => p.productId === idProducto)?.quantity ?? 0,
    [carrito],
  );

  const value = useMemo(
    () => ({
      carrito,
      loading,
      totalItems,
      guardarLocalCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      cargarCarrito,
      sincronizarConServidor,
      estaEnCarrito,
      obtenerCantidad,
    }),
    [
      carrito,
      loading,
      totalItems,
      guardarLocalCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      cargarCarrito,
      sincronizarConServidor,
      estaEnCarrito,
      obtenerCantidad,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/** Mismo nombre y forma que el hook del cliente web. */
export function useCarShop() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCarShop debe usarse dentro de <CartProvider>');
  return ctx;
}
