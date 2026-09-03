import { Stack } from 'expo-router';

/**
 * Tab "Perfil". En web la ruta era /client/perfil/:id; aquí el id sale de la
 * sesión (useAuth().Id), así que basta con index.tsx.
 */
export default function PerfilLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
