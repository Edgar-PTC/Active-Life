import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Acceder from '@/screens/auth/Acceder';
import Recuperacion from '@/screens/auth/Recuperacion';
import Registro from '@/screens/auth/Registro';
import VerificarCorreo from '@/screens/auth/VerificarCorreo';

const Stack = createNativeStackNavigator();

/** Pantallas públicas (sin sesión). */
export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Acceder" component={Acceder} />
      <Stack.Screen name="Registro" component={Registro} />
      <Stack.Screen name="VerificarCorreo" component={VerificarCorreo} />
      <Stack.Screen name="Recuperacion" component={Recuperacion} />
    </Stack.Navigator>
  );
}
