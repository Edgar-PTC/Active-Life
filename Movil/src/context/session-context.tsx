/**
 * Contexto de sesión del cliente — port de `empaquetacion/src/Context/clientContext.jsx`.
 *
 * Cambios obligados por el paso web -> native (no son features nuevas):
 *   - localStorage           -> AsyncStorage (asíncrono)
 *   - useNavigate()          -> los redirects los hace el guard de <Stack.Protected>
 *                               en app/_layout.tsx; aquí solo se cambia el estado.
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
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Alert } from 'react-native';

import { apiUrl } from '@/constants/config';

const STORAGE_KEYS = {
  nombre: 'authNombre',
  id: 'authId',
  loggedIn: 'authIsLoggedIn',
  token: 'authToken',
} as const;

// Evita hidratar el contexto con un id corrupto (ej. el string "undefined")
const esIdValido = (id: string | null): id is string =>
  typeof id === 'string' && /^[0-9a-fA-F]{24}$/.test(id);

const notify = (message: string) => Alert.alert('ActiveLife', message);

type SessionValue = {
  /** true mientras se comprueba la sesión guardada al arrancar */
  verifying: boolean;
  /** true mientras hay una petición de login/logout en curso */
  loading: boolean;
  isLoggedIn: boolean;
  Nombre: string;
  Id: string;
  email: string;
  password: string;
  setEmail: (v: string) => void;
  setPassword: (v: string) => void;
  logInCliente: () => Promise<void>;
  verify: () => Promise<void>;
  logOut: () => Promise<void>;
};

const SessionContext = createContext<SessionValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [verifying, setVerifying] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Nombre, setNombre] = useState('');
  const [Id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /** Guarda los datos de sesión que devuelve el backend. */
  const persistSession = useCallback(
    async (json: { Id?: string; Nombre?: string; token?: string }) => {
      const entries: [string, string][] = [
        [STORAGE_KEYS.loggedIn, 'true'],
      ];
      if (esIdValido(json.Id ?? null)) {
        setId(json.Id as string);
        entries.push([STORAGE_KEYS.id, json.Id as string]);
      }
      if (json.Nombre) {
        setNombre(json.Nombre);
        entries.push([STORAGE_KEYS.nombre, json.Nombre]);
      }
      if (json.token) entries.push([STORAGE_KEYS.token, json.token]);
      await AsyncStorage.multiSet(entries);
      setIsLoggedIn(true);
    },
    [],
  );

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
        const messages: Record<string, string> = {
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
      // El redirect a (client) lo hace el guard de app/_layout.tsx al cambiar isLoggedIn.
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
        setId(id as string);
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
    verify();
  }, [verify]);

  const value = useMemo<SessionValue>(
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
