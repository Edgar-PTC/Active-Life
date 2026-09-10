/**
 * Productos de la tienda — port de `empaquetacion/src/hooks/useProducts.jsx`.
 *
 * Cambios web -> native (no son features nuevas):
 *   - fetch a URL fija (localhost:4000)  -> apiUrl() de constants/config
 *   - Swal.fire(...)                     -> Alert nativo
 *
 * Misma API que la web: productosArray, productoDetail, getProducts(),
 * searchByName(nombre), getProductDetail(id).
 * `cargando` arranca en true porque tanto la Tienda como el detalle llaman a su
 * fetch al montar.
 */
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { apiUrl } from '@/constants/config';

export default function useProducts() {
  const [productosArray, setProductosArray] = useState([]);
  const [productoDetail, setProductoDetail] = useState({});
  const [cargando, setCargando] = useState(true);

  const getProducts = useCallback(async () => {
    setCargando(true);
    try {
      const res = await fetch(apiUrl('/products'));
      if (!res.ok) {
        Alert.alert('Tienda', 'No se pudo traer los productos');
        return;
      }
      const json = await res.json();
      setProductosArray(Array.isArray(json) ? json : []);
    } catch (error) {
      console.log('Error cargando productos:', error);
      Alert.alert('Tienda', 'Error interno del servidor');
    } finally {
      setCargando(false);
    }
  }, []);

  const searchByName = useCallback(async (nombre) => {
    setCargando(true);
    try {
      const res = await fetch(apiUrl('/products/getByName'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: nombre }),
      });
      if (!res.ok) {
        Alert.alert('Tienda', 'No se pudo traer los productos');
        return;
      }
      const json = await res.json();
      setProductosArray(Array.isArray(json) ? json : []);
    } catch (error) {
      console.log('Error buscando productos:', error);
      Alert.alert('Tienda', 'Error interno del servidor');
    } finally {
      setCargando(false);
    }
  }, []);

  const getProductDetail = useCallback(async (id) => {
    setCargando(true);
    try {
      const res = await fetch(apiUrl(`/products/${id}`));
      if (!res.ok) {
        Alert.alert('Tienda', 'No se pudo traer el producto');
        return;
      }
      const json = await res.json();
      setProductoDetail(json && typeof json === 'object' ? json : {});
    } catch (error) {
      console.log('Error cargando el producto:', error);
      Alert.alert('Tienda', 'Error interno del servidor');
    } finally {
      setCargando(false);
    }
  }, []);

  return {
    productosArray,
    productoDetail,
    cargando,
    getProducts,
    searchByName,
    getProductDetail,
  };
}
