import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useAuth } from '@/context/session-context';
import AuthNavigator from '@/navigation/AuthNavigator';
import ClientNavigator from '@/navigation/ClientNavigator';

const RootStack = createNativeStackNavigator();

/**
 * Switch raíz de la app (patrón "auth flow" de React Navigation):
 * se renderiza SOLO el stack que corresponde a la sesión, y al cambiar
 * `isLoggedIn` React Navigation hace la transición automáticamente.
 *   - sin sesión  -> AuthNavigator   (login, registro, verificación, recuperación)
 *   - con sesión  -> ClientNavigator (barra de tabs inferior)
 */
export default function RootNavigator() {
  const { isLoggedIn, verifying } = useAuth();

  useEffect(() => {
    if (!verifying) SplashScreen.hideAsync();
  }, [verifying]);

  if (verifying) return null; // splash visible mientras se rehidrata la sesión

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <RootStack.Screen name="Client" component={ClientNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
}
