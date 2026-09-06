/**
 * Fila de producto en el carrito — diseño del boceto móvil:
 * [ imagen | franja verde con nombre, precio y contador +/- | franja salmón con papelera ]
 */
import { Image } from 'expo-image';
import { Minus, Plus, Trash2 } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/theme/brand';

export default function CartItem({ producto, onIncrement, onDecrement, onRemove }) {
  const precio = Number(producto.precioUni || 0).toFixed(2);

  return (
    <View className="flex-row overflow-hidden rounded-[18px] bg-brand-green-med">
      <Image
        source={producto.image}
        className="m-1.5 h-24 w-24 self-center rounded-xl bg-brand-surface"
        contentFit="cover"
        transition={150}
      />

      <View className="flex-1 justify-center gap-2.5 px-3 py-3">
        <Text className="text-[17px] font-extrabold text-white" numberOfLines={2}>
          {producto.name || 'Producto'}
        </Text>

        <View className="flex-row items-center justify-between">
          <Text className="text-sm font-semibold text-white">${precio} / u</Text>

          <View className="flex-row items-center gap-1">
            <TouchableOpacity
              className="h-7 w-7 items-center justify-center rounded-lg bg-brand-stepper"
              onPress={() => onIncrement(producto.productId)}
              activeOpacity={0.7}>
              <Plus size={15} color={Brand.white} />
            </TouchableOpacity>
            <View className="h-7 min-w-[30px] items-center justify-center rounded-lg bg-brand-chip px-1.5">
              <Text className="text-[15px] font-extrabold text-brand-ink">{producto.quantity}</Text>
            </View>
            <TouchableOpacity
              className="h-7 w-7 items-center justify-center rounded-lg bg-brand-stepper"
              onPress={() => onDecrement(producto.productId)}
              activeOpacity={0.7}>
              <Minus size={15} color={Brand.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        className="w-16 items-center justify-center bg-brand-salmon"
        onPress={() => onRemove(producto.productId)}
        activeOpacity={0.8}>
        <Trash2 size={22} color={Brand.white} />
      </TouchableOpacity>
    </View>
  );
}
