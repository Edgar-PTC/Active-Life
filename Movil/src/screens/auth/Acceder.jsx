/**
 * INICIO DE SESIÓN — adaptación funcional de
 * `empaquetacion/src/Pages/Web - Client/Acceder.jsx`.
 *
 * Misma funcionalidad que la web:
 *   - campos Correo / Contraseña guardados en el contexto de sesión
 *   - botón que llama a logInCliente() y muestra "Comprobando..." mientras carga
 *   - enlaces a Registro y Recuperar contraseña
 * Al iniciar sesión con éxito, RootNavigator cambia solo a las tabs del cliente.
 */
import { Image } from 'expo-image';
import { useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
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

const LOGO_URL =
  'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png';

export default function Acceder({ navigation }) {
  const { email, password, setEmail, setPassword, logInCliente, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    Keyboard.dismiss();
    logInCliente();
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Image
              source={LOGO_URL}
              style={styles.logo}
              contentFit="contain"
              transition={200}
            />
            <Text style={styles.title}>INICIO DE SESIÓN</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Correo electrónico</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="tucorreo@ejemplo.com"
                placeholderTextColor={Brand.muted}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                editable={!loading}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={Brand.muted}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="go"
                  onSubmitEditing={onSubmit}
                  editable={!loading}
                />
                <Pressable
                  style={styles.toggle}
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={8}>
                  <Text style={styles.toggleText}>{showPassword ? 'Ocultar' : 'Ver'}</Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                (pressed || loading) && styles.buttonPressed,
              ]}
              onPress={onSubmit}
              disabled={loading}>
              {loading ? (
                <View style={styles.buttonLoading}>
                  <ActivityIndicator color={Brand.white} />
                  <Text style={styles.buttonText}>Comprobando...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Iniciar sesión</Text>
              )}
            </Pressable>

            <View style={styles.links}>
              <Text style={styles.linkMuted}>
                ¿No tienes cuenta?{' '}
                <Text style={styles.link} onPress={() => navigation.navigate('Registro')}>
                  Regístrate
                </Text>
              </Text>
              <Text style={styles.link} onPress={() => navigation.navigate('Recuperacion')}>
                Recuperar contraseña
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.green },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: {
    backgroundColor: Brand.white,
    borderRadius: 24,
    padding: 24,
    gap: 14,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  logo: { width: 120, height: 120, alignSelf: 'center' },
  title: {
    textAlign: 'center',
    color: Brand.ink,
    fontWeight: '800',
    fontSize: 22,
    letterSpacing: 1,
    marginBottom: 4,
  },
  field: { gap: 6 },
  label: { color: Brand.greenDark, fontWeight: '600', fontSize: 13 },
  input: {
    borderWidth: 1,
    borderColor: '#DDE4D6',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: Brand.ink,
    backgroundColor: '#FAFCF8',
  },
  passwordRow: { position: 'relative', justifyContent: 'center' },
  passwordInput: { paddingRight: 64 },
  toggle: { position: 'absolute', right: 12, paddingVertical: 6, paddingHorizontal: 4 },
  toggleText: { color: Brand.greenDark, fontWeight: '700', fontSize: 13 },
  button: {
    backgroundColor: Brand.green,
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonPressed: { opacity: 0.85 },
  buttonLoading: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  buttonText: { color: Brand.white, fontWeight: '700', fontSize: 16 },
  links: { alignItems: 'center', gap: 10, marginTop: 4 },
  linkMuted: { color: Brand.muted, fontSize: 14 },
  link: { color: Brand.greenDark, fontWeight: '700', fontSize: 14 },
});
