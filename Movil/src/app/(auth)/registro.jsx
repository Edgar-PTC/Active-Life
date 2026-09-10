/**
 * REGISTRO — port de `empaquetacion/src/Pages/Web - Client/RegistroClient.jsx`.
 */
import { Link, useRouter } from 'expo-router';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/theme/brand';
import { useAuth } from '@/context/session-context';

export default function Registro() {
  const router = useRouter();
  const {
    name,
    birthDate,
    email,
    password,
    confirmPassword,
    setName,
    setBirthDate,
    setEmail,
    setPassword,
    setConfirmPassword,
    registrarCliente,
    loading,
  } = useAuth();

  const onSubmit = async () => {
    const ok = await registrarCliente();
    if (ok) router.push('/(auth)/verificar-correo');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Text style={styles.brand}>ActiveLife</Text>
            <Text style={styles.title}>REGISTRARSE</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor={Brand.muted}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de nacimiento (AAAA-MM-DD)"
              placeholderTextColor={Brand.muted}
              value={birthDate}
              onChangeText={setBirthDate}
              autoCapitalize="none"
            />
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
              placeholder="Crear contraseña"
              placeholderTextColor={Brand.muted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor={Brand.muted}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              disabled={loading}
              onPress={onSubmit}>
              {loading ? (
                <ActivityIndicator color={Brand.white} />
              ) : (
                <Text style={styles.buttonText}>Registrarse</Text>
              )}
            </Pressable>

            <Link href="/(auth)/acceder" style={styles.link}>
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.surface },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 24 },
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
