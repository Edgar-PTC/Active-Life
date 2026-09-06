/**
 * MI CARRITO — diseño del boceto móvil.
 * Header con logo + "Carrito", banner de productos pendientes, lista de productos
 * (CartItem) y botón "Pagar" abajo. Los totales se muestran en la pantalla de pago.
 */
import { Image } from 'expo-image';
import { CreditCard, ShoppingCart } from 'lucide-react-native';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Image source={LOGO_URL} style={styles.logo} contentFit="contain" />
        <Text style={styles.crumb}> • Carrito</Text>
      </View>

      <View style={styles.banner}>
        <View style={styles.bannerIcon}>
          <ShoppingCart size={20} color={Brand.white} />
        </View>
        <Text style={styles.bannerText}>
          {totalItems} {totalItems === 1 ? 'Producto pendiente' : 'Productos pendientes'}
        </Text>
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => String(item.productId)}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
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
            <ActivityIndicator color={Brand.greenDark} style={styles.empty} />
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>Tu carrito está vacío</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Tienda')} activeOpacity={0.7}>
                <Text style={styles.emptyLink}>Ir a la tienda</Text>
              </TouchableOpacity>
            </View>
          )
        }
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.payButton, !puedesPagar && styles.payDisabled]}
          disabled={!puedesPagar}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('PagoCarrito')}>
          <CreditCard size={20} color={Brand.white} />
          <Text style={styles.payText}>Pagar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Brand.sage },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
  },
  logo: { width: 128, height: 26 },
  crumb: { fontSize: 18, fontWeight: '800', color: '#5C5140' },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(138,168,120,0.35)',
  },
  bannerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Brand.greenMed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: Brand.greenDark,
  },
  list: { paddingHorizontal: 16, paddingBottom: 16, flexGrow: 1 },
  sep: { height: 12 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 70, gap: 8 },
  emptyText: { color: Brand.muted, fontSize: 15 },
  emptyLink: { color: Brand.greenDark, fontWeight: '700', fontSize: 15 },
  footer: { paddingHorizontal: 16, paddingTop: 6, paddingBottom: 12 },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Brand.button,
    borderRadius: 18,
    paddingVertical: 17,
  },
  payDisabled: { opacity: 0.5 },
  payText: { color: Brand.white, fontSize: 18, fontWeight: '800' },
});
