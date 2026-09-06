/**
 * MI CARRITO — diseño del boceto móvil.
 * Header con logo + "Carrito", banner de productos pendientes, lista de productos
 * (CartItem) y botón "Pagar" abajo. Los totales se muestran en la pantalla de pago.
 */
import { Image } from 'expo-image';
import { CreditCard, ShoppingCart } from 'lucide-react-native';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CartItem from '@/components/CartItem';
import { useCarShop } from '@/context/cart-context';
import { Brand } from '@/theme/brand';

const LOGO_URL =
  'https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png';

export default function Carrito({ navigation }) {
  const {
    carrito,
    loading,
    totalItems,
    guardarLocalCarrito,
    eliminarDelCarrito,
    obtenerCantidad,
  } = useCarShop();

  const productos = carrito.productos ?? [];

  const sumar = (id) => guardarLocalCarrito(id, 1);
  const restar = (id) => {
    if (obtenerCantidad(id) > 1) guardarLocalCarrito(id, -1);
    else eliminarDelCarrito(id);
  };

  const puedesPagar = productos.length > 0 && !loading;

  return (
    <SafeAreaView className="flex-1 bg-brand-sage" edges={['top']}>
      <View className="flex-row items-center px-5 pb-3.5 pt-2">
        <Image source={LOGO_URL} className="h-[26px] w-32" contentFit="contain" />
        <Text className="text-[18px] font-extrabold text-brand-crumb"> • Carrito</Text>
      </View>

      <View className="mx-4 mb-3.5 flex-row items-center rounded-2xl bg-brand-green-med/35 px-3 py-3">
        <View className="h-11 w-11 items-center justify-center rounded-full bg-brand-green-med">
          <ShoppingCart size={20} color={Brand.white} />
        </View>
        <Text className="flex-1 text-center text-base font-extrabold text-brand-green-dark">
          {totalItems} {totalItems === 1 ? 'Producto pendiente' : 'Productos pendientes'}
        </Text>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.productId)}
        contentContainerClassName="grow px-4 pb-4"
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <CartItem
            producto={item}
            onIncrement={sumar}
            onDecrement={restar}
            onRemove={eliminarDelCarrito}
          />
        )}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color={Brand.greenDark} className="items-center justify-center py-[70px]" />
          ) : (
            <View className="items-center justify-center gap-2 py-[70px]">
              <Text className="text-[15px] text-brand-muted">Tu carrito está vacío</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Tienda')} activeOpacity={0.7}>
                <Text className="text-[15px] font-bold text-brand-green-dark">Ir a la tienda</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />

      <View className="px-4 pb-3 pt-1.5">
        <TouchableOpacity
          className={`flex-row items-center justify-center gap-2.5 rounded-[18px] bg-brand-button py-[17px] ${
            puedesPagar ? '' : 'opacity-50'
          }`}
          disabled={!puedesPagar}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PagoCarrito')}>
          <CreditCard size={20} color={Brand.white} />
          <Text className="text-lg font-extrabold text-white">Pagar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
