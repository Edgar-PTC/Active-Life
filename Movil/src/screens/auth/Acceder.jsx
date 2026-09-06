/**
 * INICIO DE SESION — adaptación funcional de
 * `empaquetacion/src/Pages/Web - Client/Acceder.jsx`, con el diseño del boceto móvil:
 * foto de fondo a pantalla completa + tarjeta esmerilada anclada al borde inferior.
 *
 * Funcionalidad intacta:
 *   - Correo / Contraseña guardados en el contexto de sesión
 *   - botón que llama a logInCliente() y muestra "Comprobando..." mientras carga
 *   - "Registrarse" -> pantalla de Registro
 * Al iniciar sesión con éxito, RootNavigator cambia solo a las tabs del cliente.
 */
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAuth } from '@/context/session-context';

const BG_URL =
  'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1788730484/Gemini_Generated_Foto_Inicio_Movil_pjf5tg.png';
const LOGO_URL =
  'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png';

export default function Acceder({ navigation }) {
  const insets = useSafeAreaInsets();
  const { email, password, setEmail, setPassword, logInCliente, loading } = useAuth();

  const onSubmit = () => {
    Keyboard.dismiss();
    logInCliente();
  };

  return (
    <View style={styles.root}>
      <Image source={{ uri: BG_URL }} style={StyleSheet.absoluteFill} contentFit="cover" />

      <View style={styles.card}>
        <BlurView intensity={45} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.cardTint} />

        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 26 }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <Image
            source={LOGO_URL}
            style={styles.logo}
            contentFit="contain"
            transition={200}
          />
          <Text style={styles.title}>INICIO DE SESION</Text>

          <Text style={styles.label}>Correo Electronico</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            editable={!loading}
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="go"
            onSubmitEditing={onSubmit}
            editable={!loading}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={onSubmit}
            disabled={loading}>
            {loading ? (
              <View style={styles.buttonRow}>
                <ActivityIndicator color="#FFFFFF" />
                <Text style={styles.buttonText}>Comprobando...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>Iniciar sesion</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Registro')} activeOpacity={0.7}>
            <Text style={styles.registrarse}>Registrarse</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#B9AFA4' },
  card: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    backgroundColor: 'rgba(116,136,116,0.36)',
  },
  cardTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 24,
    paddingBottom: 8,
  },
  logo: { width: 200, height: 52, alignSelf: 'center' },
  title: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 28,
    letterSpacing: 1,
    marginTop: 12,
    marginBottom: 22,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 1 },
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 7,
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowRadius: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2C3E1F',
  },
  button: {
    backgroundColor: '#8BB96B',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  buttonRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  buttonText: { color: '#FFFFFF', fontWeight: '800', fontSize: 16 },
  registrarse: {
    textAlign: 'center',
    color: '#20301A',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 18,
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowRadius: 5,
  },
});
