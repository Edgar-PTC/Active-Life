/**
 * INICIO DE SESIÓN — port de `empaquetacion/src/Pages/Web - Client/Acceder.jsx`.
 * Dueño: Edgar. Sirve además de ejemplo de cómo consumir useAuth() en native.
 */
import { Link, useRouter } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/theme/brand';
import { useAuth } from '@/context/session-context';

export default function Acceder() {
  const router = useRouter();
  const { email, password, setEmail, setPassword, logInCliente, loading, isLoggedIn } = useAuth();

  // Cuando el login tiene éxito, el guard raíz ya permite (client): entramos.
  useEffect(() => {
    if (isLoggedIn) router.replace('/(client)/inicio');
  }, [isLoggedIn, router]);

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <Text style={styles.brand}>ActiveLife</Text>
          <Text style={styles.title}>INICIO DE SESIÓN</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor={Brand.muted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={Brand.muted}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            disabled={loading}
            onPress={logInCliente}>
            {loading ? (
              <ActivityIndicator color={Brand.white} />
            ) : (
              <Text style={styles.buttonText}>Acceder</Text>
            )}
          </Pressable>

          <Link href="/(auth)/recuperacion" style={styles.link}>
            ¿Olvidaste tu contraseña?
          </Link>
          <Link href="/(auth)/registro" style={styles.link}>
            Crear una cuenta
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.surface },
  flex: { flex: 1, justifyContent: 'center', padding: 24 },
  card: {
    backgroundColor: Brand.white,
    borderRadius: 24,
    padding: 24,
    gap: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  brand: { textAlign: 'center', color: Brand.greenDark, fontWeight: '700', fontSize: 18 },
  title: {
    textAlign: 'center',
    color: Brand.ink,
    fontWeight: '800',
    fontSize: 22,
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDE4D6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Brand.ink,
  },
  button: {
    backgroundColor: Brand.green,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: Brand.white, fontWeight: '700', fontSize: 16 },
  link: { textAlign: 'center', color: Brand.greenDark, fontSize: 14, paddingVertical: 2 },
});
