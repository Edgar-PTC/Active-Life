import { Stack } from 'expo-router';

/** Pantallas públicas (sin sesión): login, registro, verificación, recuperación. */
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="acceder" />
      <Stack.Screen name="registro" />
      <Stack.Screen name="verificar-correo" />
      <Stack.Screen name="recuperacion" />
    </Stack>
  );
}
