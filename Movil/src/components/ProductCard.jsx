/**
 * Tarjeta de producto de la tienda — diseño del boceto móvil:
 * imagen arriba (con destello en la esquina) + panel verde con nombre y precio.
 * Port de `empaquetacion/src/Components/CardProductDashClient.jsx`.
 */
import { Image } from 'expo-image';
import { Sparkle } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';

import { Brand } from '@/theme/brand';

export default function ProductCard({ producto, onPress }) {
  const precio = Number(producto.price || 0).toFixed(2);

  return (
    <TouchableOpacity
      className="flex-1 overflow-hidden rounded-2xl bg-brand-green"
      activeOpacity={0.85}
      onPress={onPress}>
      <View className="relative">
        <Image
          source={producto.image}
          className="aspect-[4/3] w-full bg-brand-surface"
          contentFit="cover"
          transition={150}
        />
        <View className="absolute bottom-2 right-2">
          <Sparkle size={16} color={Brand.white} fill={Brand.white} />
        </View>
      </View>

      <View className="px-3 py-3">
        <Text className="text-[15px] font-bold text-white" numberOfLines={2}>
          {producto.name || 'Producto'}
        </Text>
        <Text className="mt-0.5 text-[13px] text-white/90">${precio}</Text>
      </View>
    </TouchableOpacity>
  );
}
