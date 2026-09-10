import { Stack } from 'expo-router';

/** Tab "Gimnasios": listado -> detalle -> pago de membresía. */
export default function GimnasiosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="pago-membresia" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
