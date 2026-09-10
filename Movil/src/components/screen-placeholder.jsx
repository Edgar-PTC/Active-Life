/**
 * Marcador temporal para las pantallas todavía sin portar.
 * Cada responsable reemplaza el contenido de su archivo por el port real
 * de la pantalla web correspondiente.
 */
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/theme/brand';

export function ScreenPlaceholder({ title, owner, source, note }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.box}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.owner}>Responsable: {owner}</Text>
        <Text style={styles.source}>Origen: {source}</Text>
        {note ? <Text style={styles.note}>{note}</Text> : null}
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
  note: { fontSize: 12, color: Brand.muted, textAlign: 'center', marginTop: 6 },
});
