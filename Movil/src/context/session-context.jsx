/**
 * Contexto de sesión del cliente — port de `empaquetacion/src/Context/clientContext.jsx`.
 *
 * Cambios obligados por el paso web -> native (no son features nuevas):
 *   - localStorage           -> AsyncStorage (asíncrono)
 *   - useNavigate()          -> el cambio de stack lo hace RootNavigator según isLoggedIn;
 *                               aquí solo se cambia el estado.
 *   - Swal.fire(...)         -> notify() (Alert nativo). Misma intención, sin UI web.
 *   - LogInCliente(event)    -> logInCliente() sin argumento (no hay evento de <form>).
 *
 * AUTH POR COOKIE:
 *   El backend responde al login con `Set-Cookie: authCookieClient=<jwt>` (no manda
 *   el token en el body). En React Native el stack nativo de red guarda esa cookie
 *   automáticamente y la reenvía en las siguientes peticiones al mismo host, así que
 *   el login funciona sin librerías extra. `credentials: 'include'` deja clara la
 *   intención. La sesión "recordada" entre reinicios la damos con AsyncStorage
 *   (Id + Nombre); si más adelante el backend devuelve el token en el body, basta
 *   con guardarlo en STORAGE_KEYS.token y mandarlo como `Authorization: Bearer`.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

import { apiUrl } from '@/constants/config';

const STORAGE_KEYS = {
  nombre: 'authNombre',
  id: 'authId',
  loggedIn: 'authIsLoggedIn',
  token: 'authToken',
};

// Evita hidratar el contexto con un id corrupto (ej. el string "undefined")
const esIdValido = (id) => typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

const notify = (message) => Alert.alert('ActiveLife', message);

const SessionContext = createContext(undefined);

export function SessionProvider({ children }) {
  const [verifying, setVerifying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Nombre, setNombre] = useState('');
  const [Id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** Guarda los datos de sesión que devuelve el backend. */
  const persistSession = useCallback(async (json) => {
    const entries = [[STORAGE_KEYS.loggedIn, 'true']];
    if (esIdValido(json.Id)) {
      setId(json.Id);
      entries.push([STORAGE_KEYS.id, json.Id]);
    }
    if (json.Nombre) {
      setNombre(json.Nombre);
      entries.push([STORAGE_KEYS.nombre, json.Nombre]);
    }
    if (json.token) entries.push([STORAGE_KEYS.token, json.token]);
    await AsyncStorage.multiSet(entries);
    setIsLoggedIn(true);
  }, []);

  const clearSession = useCallback(async () => {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    setIsLoggedIn(false);
    setNombre('');
    setId('');
    setEmail('');
    setPassword('');
  }, []);

  /**
   * Inicia sesión contra POST /apiActiveLife/logInClients.
   * Devuelve true si el login fue correcto (para que la pantalla reaccione si quiere).
   */
  const logInCliente = useCallback(async () => {
    if (!email.trim() || !password) {
      notify('Completa ambos campos para verificar tu identidad');
      return false;
    }
    try {
      setLoading(true);
      const res = await fetch(apiUrl('/logInClients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Mensajes exactos que devuelve logInClientsController.js
        const minutos = Math.max(1, Math.round((json.time ?? 0) / 60000));
        const messages = {
          'Email not found': 'No existe ninguna cuenta con este correo',
          'Contraseña incorrecta': 'Contraseña incorrecta. Inténtalo de nuevo',
          'Cuenta bloqueada': `Cuenta bloqueada por intentos fallidos. Espera ${minutos} min`,
        };
        notify(messages[json.message] ?? 'No se pudo iniciar sesión');
        return false;
      }

      // Éxito: { message, Id, Nombre }  (+ cookie authCookieClient)
      await persistSession(json);
      setPassword('');
      // RootNavigator cambia solo a las tabs del cliente al ponerse isLoggedIn = true.
      return true;
    } catch (error) {
      console.log('Error login:', error);
      notify('No se pudo conectar con el servidor. Revisa tu conexión y la URL del API.');
      return false;
    } finally {
      setLoading(false);
    }
  }, [email, password, persistSession]);

  /** Rehidrata la sesión guardada al abrir la app. */
  const verify = useCallback(async () => {
    try {
      setVerifying(true);
      const [nombre, id, loggedIn] = await AsyncStorage.multiGet([
        STORAGE_KEYS.nombre,
        STORAGE_KEYS.id,
        STORAGE_KEYS.loggedIn,
      ]).then((pairs) => pairs.map(([, v]) => v));

      if (loggedIn === 'true' && esIdValido(id)) {
        setNombre(nombre ?? '');
        setId(id);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      // TODO(backend): si se pasa a tokens, revalidar aquí contra /auth/client
      // con Authorization: Bearer <token> y hacer clearSession() si es 401.
    } catch (error) {
      console.log('Error verify:', error);
      setIsLoggedIn(false);
    } finally {
      setVerifying(false);
    }
  }, []);

  const logOut = useCallback(async () => {
    try {
      setLoading(true);
      await fetch(apiUrl('/logOutClients'), { method: 'POST' }).catch(() => {});
      await clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    // verify() es async: todos sus setState ocurren después de un await, no de forma síncrona.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    verify();
  }, [verify]);

  const value = useMemo(
    () => ({
      verifying,
      loading,
      isLoggedIn,
      Nombre,
      Id,
      email,
      password,
      setEmail,
      setPassword,
      logInCliente,
      verify,
      logOut,
    }),
    [verifying, loading, isLoggedIn, Nombre, Id, email, password, logInCliente, verify, logOut],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/** Reemplazo de `useAuth()` del cliente web. */
export function useAuth() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de <SessionProvider>');
  return ctx;
}
