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
 * PENDIENTE DE ARQUITECTURA (no bloquea la navegación, hablarlo con backend):
 *   El backend usa auth por COOKIE (cookie-parser + credentials:"include" + CORS
 *   bloqueado a FRONTEND_URL). React Native no comparte el "cookie jar" del navegador
 *   ni manda Origin, así que `verify()` por cookie no va a funcionar tal cual.
 *   Lo normal en native es que el login devuelva un token y guardarlo en AsyncStorage
 *   / SecureStore y mandarlo en `Authorization: Bearer`. Dejo el esqueleto preparado
 *   para enchufar eso sin tocar las pantallas.
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

  const logInCliente = useCallback(async () => {
    if (!email || !password) {
      notify('Completa ambos campos para verificar tu identidad');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(apiUrl('/logInClients'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        const messages = {
          'Email not found': 'No existe ningún usuario con este correo',
          'Contraseña incorrecta': 'Contraseña incorrecta. Inténtalo de nuevo',
          'Cuenta bloqueada': `Cuenta bloqueada. Espera ${Math.round(
            (json.time ?? 0) / 60000,
          )} minutos`,
        };
        notify(messages[json.message] ?? 'No se pudo iniciar sesión');
        return;
      }

      const json = await res.json();
      await persistSession(json);
      setPassword('');
      // El cambio a las tabs del cliente lo hace RootNavigator al cambiar isLoggedIn.
    } catch (error) {
      console.log('Error login:', error);
      notify('Error interno del servidor');
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
