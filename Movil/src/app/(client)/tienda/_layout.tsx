import { Stack } from 'expo-router';

/** Tab "Tienda": listado de productos -> detalle de producto. */
export default function TiendaLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
