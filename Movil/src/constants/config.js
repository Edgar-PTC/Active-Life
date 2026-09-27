/**
 * Configuración de red compartida por toda la app.
 *
 * La URL del API sale de la variable de entorno EXPO_PUBLIC_API_URL:
 *   - Desarrollo: archivo `.env` (no se sube a git, ver `.env.example`).
 *   - APK con EAS: `eas.json` -> build.<perfil>.env (apunta a Render).
 *
 * En un dispositivo/emulador `localhost` apunta al propio teléfono, así que en
 * desarrollo hay que usar la IP LAN de la máquina que corre el backend:
 *   - Emulador Android .......... http://10.0.2.2:4000/apiActiveLife
 *   - Dispositivo físico ........ http://<IP-DE-TU-PC>:4000/apiActiveLife
 *
 * Ojo: Expo incrusta el valor al empaquetar; si cambias el .env reinicia con
 * `npx expo start -c`.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/apiActiveLife';

/** Ayuda para construir endpoints: apiUrl('/logInClients') */
export const apiUrl = (path) =>
  `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
