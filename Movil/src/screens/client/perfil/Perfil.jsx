/**
 * CONFIGURACIÓN (Perfil) — port de `empaquetacion/src/Pages/Web - Client/Perfil.jsx`
 * con el diseño del boceto móvil.
 *
 * Funcionalidad (igual que la web):
 *   - me(Id) al montar: carga nombre / correo / fecha de nacimiento (y ventas)
 *   - lápiz -> modal "Editar perfil" -> update({ name, email, birthDate })
 *   - "Cerrar sesion" -> logOut() del contexto de sesión
 *
 * El boceto no incluye la sección "Ventas anteriores" del perfil web, así que no
 * se pinta (el hook sí las trae). Las 5 filas de ajustes son decorativas: en la
 * web esos botones tampoco tienen acción.
 */
import { Image } from 'expo-image';
import {
  ChevronRight,
  FileText,
  HelpCircle,
  Lock,
  Phone,
  Shield,
  SquarePen,
  UserRound,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/session-context';
import usePerfil from '@/hooks/usePerfil';
import { Brand } from '@/theme/brand';

const LOGO_URL =
  'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png';

const SETTINGS_ITEMS = [
  { Icon: Phone, label: 'Soporte Tecnico' },
  { Icon: Lock, label: 'Cambiar contraseña' },
  { Icon: HelpCircle, label: 'Centro de ayuda / FAQ' },
  { Icon: FileText, label: 'Terminos y Condiciones' },
  { Icon: Shield, label: 'Politicas de Privacidad' },
];

// Se monta solo cuando el modal está abierto, así el formulario arranca siempre
// con los datos actuales del perfil sin necesidad de un efecto que lo sincronice.
function EditProfileModal({ onClose, nombre, email, birthdate, guardando, onSave }) {
  const [form, setForm] = useState(() => ({ name: nombre, email, birthDate: birthdate }));

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-brand-ink/50 px-5">
        <Pressable className="absolute inset-0" onPress={onClose} />
        <View className="w-full max-w-md rounded-3xl bg-brand-surface p-6">
          <Text className="text-[11px] font-bold uppercase tracking-widest text-brand-green">
            ActiveLife
          </Text>
          <Text className="mb-4 mt-1 text-[20px] font-bold text-brand-green-forest">
            Editar perfil
          </Text>

          <Text className="mb-1.5 text-[13px] font-semibold text-brand-green-forest">Nombre</Text>
          <TextInput
            className="mb-4 rounded-xl border border-[#D6E0CC] bg-white px-4 py-3 text-brand-ink"
            value={form.name}
            onChangeText={set('name')}
            placeholder="Nombre completo"
            placeholderTextColor="#9DAE95"
          />

          <Text className="mb-1.5 text-[13px] font-semibold text-brand-green-forest">Correo</Text>
          <TextInput
            className="mb-4 rounded-xl border border-[#D6E0CC] bg-white px-4 py-3 text-brand-ink"
            value={form.email}
            onChangeText={set('email')}
            placeholder="correo@ejemplo.com"
            placeholderTextColor="#9DAE95"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
          />

          <Text className="mb-1.5 text-[13px] font-semibold text-brand-green-forest">
            Fecha de nacimiento
          </Text>
          <TextInput
            className="mb-5 rounded-xl border border-[#D6E0CC] bg-white px-4 py-3 text-brand-ink"
            value={form.birthDate}
            onChangeText={set('birthDate')}
            placeholder="AAAA-MM-DD"
            placeholderTextColor="#9DAE95"
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 rounded-2xl border border-[#D6E0CC] py-3"
              onPress={onClose}
              activeOpacity={0.8}>
              <Text className="text-center font-semibold text-brand-green-forest">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 rounded-2xl bg-brand-green py-3 ${guardando ? 'opacity-50' : ''}`}
              disabled={guardando}
              onPress={() => onSave(form)}
              activeOpacity={0.85}>
              <Text className="text-center font-semibold text-white">
                {guardando ? 'Guardando...' : 'Guardar cambios'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function Perfil() {
  const { Id, logOut, loading } = useAuth();
  const { nombre, email, birthdate, cargando, guardando, me, update } = usePerfil();
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    if (Id) me(Id);
  }, [Id, me]);

  const guardar = async (form) => {
    const ok = await update({ name: form.name, email: form.email, birthDate: form.birthDate });
    if (ok) setEditOpen(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-mist" edges={['top']}>
      <View className="flex-row items-center px-5 pb-3 pt-2">
        <Image source={LOGO_URL} className="h-[26px] w-32" contentFit="contain" />
        <Text className="text-[18px] font-extrabold text-brand-crumb"> • Configuración</Text>
      </View>

      <ScrollView contentContainerClassName="grow px-4 pb-8" showsVerticalScrollIndicator={false}>
        <View className="mt-1 flex-row items-center rounded-3xl bg-brand-green p-5">
          <View className="h-16 w-16 items-center justify-center rounded-full bg-brand-green-med">
            <UserRound size={34} color={Brand.surface} />
          </View>
          <View className="ml-4 flex-1">
            <Text className="text-[17px] font-bold text-white" numberOfLines={2}>
              {cargando ? 'Cargando...' : nombre || 'Sin datos'}
            </Text>
            <Text className="mt-0.5 text-[13px] text-white/85" numberOfLines={1}>
              {email || 'Sin datos'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setEditOpen(true)}
            activeOpacity={0.7}
            className="ml-2 p-1">
            <SquarePen size={22} color={Brand.white} />
          </TouchableOpacity>
        </View>

        <View className="mt-6 gap-3">
          {SETTINGS_ITEMS.map(({ Icon, label }) => (
            <View
              key={label}
              className="flex-row items-center gap-4 rounded-2xl bg-brand-green px-5 py-4">
              <Icon size={22} color={Brand.white} />
              <Text className="flex-1 text-[15px] font-bold text-white">{label}</Text>
              <ChevronRight size={18} color="rgba(255,255,255,0.7)" />
            </View>
          ))}
        </View>

        <Text className="mt-7 text-center text-[14px] text-brand-muted">
          Versión de la App: v1.0.4
        </Text>

        <TouchableOpacity
          className={`mt-4 rounded-2xl bg-brand-salmon py-4 ${loading ? 'opacity-50' : ''}`}
          disabled={loading}
          activeOpacity={0.85}
          onPress={logOut}>
          <Text className="text-center text-[16px] font-bold text-white">Cerrar sesion</Text>
        </TouchableOpacity>
      </ScrollView>

      {editOpen ? (
        <EditProfileModal
          onClose={() => setEditOpen(false)}
          nombre={nombre}
          email={email}
          birthdate={birthdate}
          guardando={guardando}
          onSave={guardar}
        />
      ) : null}
    </SafeAreaView>
  );
}
