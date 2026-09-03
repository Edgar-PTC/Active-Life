import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import '../global.css';

import { SessionProvider, useAuth } from '@/context/session-context';

SplashScreen.preventAutoHideAsync();

/**
 * Navegador raíz. Las rutas SIEMPRE están declaradas; el `guard` decide cuál
 * grupo se puede ver según la sesión (patrón oficial de expo-router SDK 57).
 *   - sin sesión  -> grupo (auth)
 *   - con sesión  -> grupo (client)  [aquí vive la barra de tabs]
 */
function RootNavigator() {
  const { isLoggedIn, verifying } = useAuth();

  useEffect(() => {
    if (!verifying) SplashScreen.hideAsync();
  }, [verifying]);

  if (verifying) return null; // splash visible mientras se rehidrata la sesión

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(client)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SessionProvider>
        <RootNavigator />
      </SessionProvider>
    </GestureHandlerRootView>
  );
}
