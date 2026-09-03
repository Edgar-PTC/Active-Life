/**
 * Perfil — port de `empaquetacion/src/Pages/Web - Client/Perfil.jsx`. Dueño: Pablo.
 * De momento es un stub, pero ya trae el botón de cerrar sesión para poder probar
 * el ciclo completo de navegación (login -> tabs -> logout -> login).
 */
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/theme/brand';
import { useAuth } from '@/context/session-context';

export default function Perfil() {
  const { Nombre, Id, logOut, loading } = useAuth();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.box}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.owner}>Responsable: Pablo</Text>
        <Text style={styles.source}>Origen: Web - Client/Perfil.jsx</Text>

        <View style={styles.divider} />
        <Text style={styles.data}>Nombre: {Nombre || '—'}</Text>
        <Text style={styles.data}>Id: {Id || '—'}</Text>

        <Text
          style={[styles.logout, loading && styles.disabled]}
          onPress={loading ? undefined : logOut}>
          Cerrar sesión
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.surface, alignItems: 'center', justifyContent: 'center' },
  box: {
    backgroundColor: Brand.white,
    borderRadius: 16,
    padding: 20,
    margin: 24,
    gap: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDE4D6',
  },
  title: { fontSize: 20, fontWeight: '800', color: Brand.ink },
  owner: { fontSize: 14, color: Brand.greenDark, fontWeight: '700' },
  source: { fontSize: 12, color: Brand.muted },
  divider: { height: 1, backgroundColor: '#DDE4D6', alignSelf: 'stretch', marginVertical: 8 },
  data: { fontSize: 13, color: Brand.ink },
  logout: {
    marginTop: 12,
    color: Brand.white,
    backgroundColor: Brand.danger,
    fontWeight: '700',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,
    overflow: 'hidden',
  },
  disabled: { opacity: 0.5 },
});
