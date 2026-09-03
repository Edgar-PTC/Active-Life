import { Stack } from 'expo-router';

/** Tab "Carrito": carrito -> pago del carrito. */
export default function CarritoLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="pago" />
    </Stack>
  );
}
