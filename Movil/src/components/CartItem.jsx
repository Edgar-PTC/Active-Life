/**
 * Fila de producto en el carrito — diseño del boceto móvil:
 * [ imagen | franja verde con nombre, precio y contador +/- | franja salmón con papelera ]
 */
import { Image } from 'expo-image';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/theme/brand';

export default function CartItem({ producto, onIncrement, onDecrement, onRemove }) {
  const precio = Number(producto.precioUni || 0).toFixed(2);

  return (
    <View style={styles.row}>
      <Image source={producto.image} style={styles.image} contentFit="cover" transition={150} />

      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={2}>
          {producto.name || 'Producto'}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>${precio} / u</Text>

          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => onIncrement(producto.productId)}
              activeOpacity={0.7}>
              <Plus size={15} color={Brand.white} />
            </TouchableOpacity>
            <View style={styles.qtyChip}>
              <Text style={styles.qtyText}>{producto.quantity}</Text>
            </View>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => onDecrement(producto.productId)}
              activeOpacity={0.7}>
              <Minus size={15} color={Brand.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.trash}
        onPress={() => onRemove(producto.productId)}
        activeOpacity={0.8}>
        <Trash2 size={22} color={Brand.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: Brand.greenMed,
  },
  image: { width: 96, height: 96, backgroundColor: Brand.surface, alignSelf: 'center', margin: 6, borderRadius: 12 },
  middle: { flex: 1, paddingHorizontal: 12, paddingVertical: 12, justifyContent: 'center', gap: 10 },
  name: { fontSize: 17, fontWeight: '800', color: Brand.white },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 14, color: Brand.white, fontWeight: '600' },
  stepper: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Brand.stepper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyChip: {
    minWidth: 30,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EEF2E8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  qtyText: { fontSize: 15, fontWeight: '800', color: Brand.ink },
  trash: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Brand.salmon,
  },
});
