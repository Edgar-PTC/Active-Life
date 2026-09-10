/**
 * DETALLES DEL PRODUCTO — port de
 * `empaquetacion/src/Pages/Web - Client/ProductoDetalle.jsx` con el diseño del
 * boceto móvil: tarjeta verde con imagen, nombre, precio, descripción, selector
 * de talla y botón "Añadir Al Carrito".
 *
 * Funcionalidad (igual que la web):
 *   - getProductDetail(id) al montar, con el id que llega por route.params
 *   - "Añadir Al Carrito" -> guardarLocalCarrito(id, 1, producto) del CartContext
 *
 * El carrusel de puntos y las tallas salen en el boceto pero no tienen datos que
 * los respalden (el modelo de producto no guarda tallas), así que las tallas son
 * un selector visual y los puntos, decorativos.
 */
import { Image } from 'expo-image';
import { ChevronLeft, ShoppingCart, Sparkle } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCarShop } from '@/context/cart-context';
import useProducts from '@/hooks/useProducts';
import { Brand } from '@/theme/brand';

const LOGO_URL =
  'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png';

const TALLAS = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

export default function ProductoDetalle({ route, navigation }) {
  const { id } = route.params ?? {};
  const { productoDetail, cargando, getProductDetail } = useProducts();
  const { guardarLocalCarrito } = useCarShop();
  const [talla, setTalla] = useState(null);

  useEffect(() => {
    if (id) getProductDetail(id);
  }, [id, getProductDetail]);

  const p = productoDetail ?? {};
  const listo = !!p._id;
  const precio = Number(p.price || 0).toFixed(2);

  const anadir = () => {
    guardarLocalCarrito(id, 1, p);
    Alert.alert('Carrito', 'Producto añadido al carrito');
  };

  return (
    <SafeAreaView className="flex-1 bg-brand-mist" edges={['top']}>
      <View className="flex-row items-center px-5 pb-2 pt-2">
        <Image source={LOGO_URL} className="h-[24px] w-28" contentFit="contain" />
        <Text
          className="ml-1 flex-1 text-[15px] font-extrabold text-brand-crumb"
          numberOfLines={1}
          adjustsFontSizeToFit>
          {' '}
          • Tienda • Detalles del Producto
        </Text>
      </View>

      <View className="px-5 pb-3">
        <TouchableOpacity
          className="flex-row items-center gap-0.5"
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}>
          <ChevronLeft size={18} color={Brand.muted} />
          <Text className="text-sm font-semibold text-brand-muted">Regresar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerClassName="px-4 pb-8" showsVerticalScrollIndicator={false}>
        <View className="rounded-3xl bg-brand-green p-4">
          {!listo ? (
            <View className="items-center justify-center py-24">
              {cargando ? (
                <ActivityIndicator color={Brand.white} />
              ) : (
                <Text className="text-center text-white">No se pudo cargar el producto</Text>
              )}
            </View>
          ) : (
            <>
              <View className="rounded-2xl bg-brand-surface p-3">
                <View className="relative">
                  <Image
                    source={p.image}
                    className="aspect-square w-full rounded-xl"
                    contentFit="contain"
                    transition={150}
                  />
                  <View className="absolute bottom-1 right-1">
                    <Sparkle size={18} color={Brand.greenDark} fill={Brand.greenDark} />
                  </View>
                </View>
              </View>

              {/* Carrusel (decorativo: un solo producto) */}
              <View className="my-3 flex-row items-center justify-center gap-2">
                <View className="h-2.5 w-2.5 rounded-full border-2 border-brand-green-deep/50" />
                <View className="h-2.5 w-2.5 rounded-full border-2 border-brand-green-deep/50" />
                <View className="h-2.5 w-2.5 rounded-full border-2 border-brand-green-deep/50" />
              </View>

              <Text className="text-[28px] font-black text-white">{p.name}</Text>
              {p.category ? (
                <Text className="mt-1 text-[13px] font-semibold text-white/80">{p.category}</Text>
              ) : null}

              <View className="mt-3 flex-row items-center gap-3">
                <Text className="text-[30px] font-black text-white">{precio} $</Text>
                {p.discount > 0 ? (
                  <View className="rounded-full bg-[#F0EAD6] px-3 py-1">
                    <Text className="text-[12px] font-black text-brand-green-forest">OFERTA!</Text>
                  </View>
                ) : null}
              </View>

              <View className="mt-4 rounded-2xl bg-brand-green-forest px-4 py-4">
                <Text className="text-[15px] leading-6 text-white">
                  {p.description || 'Sin descripción.'}
                </Text>
              </View>

              {/* Tallas — selector visual (el modelo de producto no guarda tallas) */}
              <View className="mt-4 flex-row flex-wrap gap-2">
                {TALLAS.map((t) => (
                  <TouchableOpacity
                    key={t}
                    onPress={() => setTalla(t)}
                    activeOpacity={0.8}
                    className={`rounded-lg px-4 py-2 ${
                      talla === t ? 'bg-brand-green-deep' : 'bg-brand-green-forest'
                    }`}>
                    <Text className="text-[14px] font-bold text-white">{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View className="mt-5 items-center">
                <TouchableOpacity
                  onPress={anadir}
                  activeOpacity={0.85}
                  className="flex-row items-center justify-center gap-2.5 rounded-2xl bg-brand-green-forest px-8 py-4">
                  <ShoppingCart size={20} color={Brand.white} />
                  <Text className="text-[16px] font-extrabold text-white">Añadir Al Carrito</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
