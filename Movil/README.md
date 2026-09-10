# ActiveLife — App móvil (Expo Go)

Port a React Native del cliente web (`empaquetacion/src/Pages/Web - Client`).

- **Expo SDK 57**, corre en **Expo Go** (sin build nativo).
- **JavaScript** (sin TypeScript).
- Arranca por `index.js` → `App.jsx`.
- Navegación con **React Navigation** (no expo-router).
- Estilos con **NativeWind** (Tailwind) + paleta en `src/theme/brand.js`.

## Arrancar

```bash
npm install
npx expo start        # abre con Expo Go escaneando el QR
```

Si el login no conecta: en un dispositivo real `localhost` no vale. Edita
`src/constants/config.js` (o exporta `EXPO_PUBLIC_API_URL`) con la IP LAN de la
PC que corre el backend, p. ej. `http://192.168.1.50:4000/apiActiveLife`.

## Estructura

```
index.js                     registerRootComponent(App)
App.jsx                      providers (GestureHandler, SafeArea, Session, NavigationContainer)
src/
  navigation/
    RootNavigator.jsx        switch sesión: Auth  <->  Client
    AuthNavigator.jsx        stack sin sesión
    ClientNavigator.jsx      barra de tabs + stacks anidados (detalle/pago)
  screens/
    auth/       Acceder · Registro · VerificarCorreo · Recuperacion
    client/     Inicio
    client/gimnasios/  Gimnasios · GimnasioDetalle · PagoMembresia
    client/tienda/     Tienda · ProductoDetalle
    client/carrito/    Carrito · PagoCarrito
    client/perfil/     Perfil
  context/session-context.jsx   useAuth() — login, logout, rehidratación
  components/ScreenPlaceholder.jsx
  constants/config.js         URL del backend
  theme/brand.js              colores ActiveLife
  global.css                  directivas de Tailwind
```

El alias `@/…` apunta a `src/…` (configurado en `jsconfig.json`).

## Navegar entre pantallas

```js
navigation.navigate('ProductoDetalle', { id });   // ir al detalle
const { id } = route.params ?? {};                // leerlo en el destino
```

No hace falta redirigir tras el login: al poner `isLoggedIn = true` en el
contexto, `RootNavigator` cambia solo al stack del cliente.

## Reparto de pantallas

| Pantalla | Responsable | Origen web |
|---|---|---|
| Acceder | Edgar | Acceder.jsx |
| Registro · VerificarCorreo · Recuperacion | Chris | RegistroClient / VerificarCorreoClient / RecuperacionContra |
| Inicio | Emilio | Dashboard.jsx |
| Gimnasios · GimnasioDetalle · PagoMembresia | Pablo | Gimnasios / GimnasioDetalle (+Reseñas) / PagoMembresia |
| Tienda · ProductoDetalle · Carrito · PagoCarrito | Edgar | Tienda / ProductoDetalle / CarritoCliente / PagoCarritoCliente |
| Perfil | Pablo | Perfil.jsx |

## Pendiente (backend)

El backend autentica por **cookie** (`credentials: "include"` + CORS a `FRONTEND_URL`).
React Native no comparte cookies del navegador, así que `verify()` por cookie no
funciona tal cual: lo normal es que el login devuelva un **token** y guardarlo en
AsyncStorage / SecureStore + `Authorization: Bearer`. El hueco está marcado con
`TODO(backend)` en `src/context/session-context.jsx`.
