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

// RN no tiene utilidad de text-shadow en Tailwind v3; se aplica como style suelto.
const shadowDark = {
  textShadowColor: 'rgba(0,0,0,0.4)',
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 8,
};
const shadowDarkSm = { textShadowColor: 'rgba(0,0,0,0.4)', textShadowRadius: 6 };
const shadowLight = { textShadowColor: 'rgba(255,255,255,0.5)', textShadowRadius: 5 };

export default function Acceder({ navigation }) {
  const insets = useSafeAreaInsets();
  const { email, password, setEmail, setPassword, logInCliente, loading } = useAuth();

  const onSubmit = () => {
    Keyboard.dismiss();
    logInCliente();
  };

  return (
    <View className="flex-1 bg-brand-sand">
      <Image source={{ uri: BG_URL }} className="absolute inset-0" contentFit="cover" />

      <View className="absolute inset-x-0 bottom-0 h-[70%] overflow-hidden rounded-t-[40px] bg-[#748874]/[0.36]">
        <BlurView intensity={45} tint="light" className="absolute inset-0" />
        <View className="absolute inset-0 bg-white/10" />

        <ScrollView
          contentContainerClassName="grow justify-center px-[30px] pb-2 pt-6"
          contentContainerStyle={{ paddingBottom: insets.bottom + 26 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <Image source={LOGO_URL} className="h-[52px] w-[200px] self-center" contentFit="contain" transition={200} />
          <Text
            className="mb-[22px] mt-3 self-center text-[28px] font-extrabold tracking-[1px] text-white"
            style={shadowDark}>
            INICIO DE SESION
          </Text>

          <Text className="mb-[7px] mt-2.5 text-sm text-white" style={shadowDarkSm}>
            Correo Electronico
          </Text>
          <TextInput
            className="rounded-[14px] bg-white px-4 py-3.5 text-[15px] text-brand-ink"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            editable={!loading}
          />

          <Text className="mb-[7px] mt-2.5 text-sm text-white" style={shadowDarkSm}>
            Contraseña
          </Text>
          <TextInput
            className="rounded-[14px] bg-white px-4 py-3.5 text-[15px] text-brand-ink"
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
            className="mt-[22px] items-center justify-center rounded-2xl bg-brand-button py-4"
            activeOpacity={0.85}
            onPress={onSubmit}
            disabled={loading}>
            {loading ? (
              <View className="flex-row items-center gap-2.5">
                <ActivityIndicator color="#FFFFFF" />
                <Text className="text-base font-extrabold text-white">Comprobando...</Text>
              </View>
            ) : (
              <Text className="text-base font-extrabold text-white">Iniciar sesion</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Registro')} activeOpacity={0.7}>
            <Text className="mt-[18px] text-center text-sm font-bold text-brand-ink-dark" style={shadowLight}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
