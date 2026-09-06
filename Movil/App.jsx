import './src/global.css';
import './src/lib/nativewind';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CartProvider } from '@/context/cart-context';
import { SessionProvider } from '@/context/session-context';
import RootNavigator from '@/navigation/RootNavigator';

// El splash se mantiene visible hasta que la sesión termine de rehidratarse
// (RootNavigator llama a SplashScreen.hideAsync() cuando `verifying` pasa a false).
SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SessionProvider>
          <CartProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <StatusBar style="dark" />
          </CartProvider>
        </SessionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
