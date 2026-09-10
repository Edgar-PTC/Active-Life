/**
 * Perfil del cliente — port de `empaquetacion/src/hooks/usePerfil.jsx`.
 *
 * Cambios web -> native (no son features nuevas):
 *   - fetch a URL fija (localhost:4000)  -> apiUrl() de constants/config
 *   - Swal.fire(...)                     -> Alert nativo
 *   - el Id que en web venía de useParams -> se pasa a me() desde la sesión
 *   - el Id vivía en estado; aquí basta una ref (no se pinta)
 *
 * Misma API que la web: email, nombre, birthdate, sales, me(id), update(data).
 */
import { useCallback, useRef, useState } from 'react';
import { Alert } from 'react-native';

import { apiUrl } from '@/constants/config';

export default function usePerfil() {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sales, setSales] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const idRef = useRef('');

  const me = useCallback(async (id) => {
    idRef.current = id;
    setCargando(true);
    try {
      // 1. Datos del perfil
      const res = await fetch(apiUrl(`/clients/${id}`), {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!res.ok) {
        Alert.alert('Perfil', 'Error al obtener perfil');
        return;
      }
      const json = await res.json();
      setBirthdate(json.birthDate ? String(json.birthDate).split('T')[0] : '');
      setEmail(json.email ?? '');
      setNombre(json.name ?? '');

      // 2. Ventas del cliente (el boceto no las muestra; se traen igual que la web)
      const res2 = await fetch(apiUrl('/sales/salesClient'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ clientId: id }),
      });
      if (!res2.ok) {
        const err = await res2.json().catch(() => ({}));
        if (err.message === 'El cliente no tiene ventas registradas') {
          setSales([]);
          return;
        }
        Alert.alert('Perfil', 'Error al cargar ventas');
        return;
      }
      const json2 = await res2.json();
      setSales(json2.data || []);
    } catch (error) {
      console.log('Error en me():', error);
      Alert.alert('Perfil', 'Error interno del servidor');
    } finally {
      setCargando(false);
    }
  }, []);

  const update = useCallback(
    async (data) => {
      setGuardando(true);
      try {
        const res = await fetch(apiUrl(`/clients/${idRef.current}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          Alert.alert('Perfil', err.message || 'No se pudo actualizar el perfil');
          return false;
        }
        await me(idRef.current);
        return true;
      } catch (error) {
        console.log('Error update():', error);
        Alert.alert('Perfil', 'Error interno del servidor');
        return false;
      } finally {
        setGuardando(false);
      }
    },
    [me],
  );

  return { email, nombre, birthdate, sales, cargando, guardando, me, update };
}
