/**
 * Configuración de red compartida por toda la app.
 *
 * En web el cliente usaba http://localhost:4000/apiActiveLife.
 * En un dispositivo/emulador `localhost` apunta al propio teléfono, así que hay
 * que usar la IP LAN de la máquina que corre el backend (o un túnel).
 *
 *   - Emulador Android .......... http://10.0.2.2:4000
 *   - Dispositivo físico ........ http://<IP-DE-TU-PC>:4000   (ej. 192.168.1.50)
 *   - iOS simulator ............. http://localhost:4000
 *
 * Se puede sobrescribir con la variable de entorno EXPO_PUBLIC_API_URL.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000/apiActiveLife';

/** Ayuda para construir endpoints: apiUrl('/logInClients') */
export const apiUrl = (path) =>
  `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
